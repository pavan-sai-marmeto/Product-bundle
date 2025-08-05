if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.variantIdInput.disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        this.submitButton = this.querySelector('[type="submit"]');
        this.submitButtonText = this.submitButton.querySelector('span');

        if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

        this.hideErrors = this.dataset.hideErrors === 'true';
      }
      // add to cart worked for the below code but not cart drawer and cart notification
      // onSubmitHandler(evt) {
      //   evt.preventDefault();
      //   if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

      //   this.handleErrorMessage();

      //   this.submitButton.setAttribute('aria-disabled', true);
      //   this.submitButton.classList.add('loading');
      //   this.querySelector('.loading__spinner').classList.remove('hidden');

      //   const bundleCheckboxes = this.form.querySelectorAll('input[name="bundle_products[]"]:checked');
      //   const mainVariantId = this.variantIdInput.value;

      //   if (bundleCheckboxes.length > 0) {
      //     // Prepare items array for batch add
      //     const bundleGroupId = 'bundle_group_' + Date.now();
      //     const items = [
      //       {
      //         id: mainVariantId,
      //         quantity: 1,
      //         properties: {
      //           _bundle_group: bundleGroupId
      //         }
      //       }
      //     ];

      //     bundleCheckboxes.forEach((checkbox) => {
      //       items.push({
      //         id: checkbox.value,
      //         quantity: 1,
      //         properties: {
      //           _bundle_group: bundleGroupId
      //         }
      //       });
      //     });

      //     fetch('/cart/add.js', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'X-Requested-With': 'XMLHttpRequest',
      //       },
      //       body: JSON.stringify({ items })
      //     })
      //       .then((response) => response.json())
      //       .then((response) => {
      //         if (response.status) {
      //           this.handleErrorMessage(response.description);

      //           const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
      //           if (!soldOutMessage) return;
      //           this.submitButton.setAttribute('aria-disabled', true);
      //           this.submitButtonText.classList.add('hidden');
      //           soldOutMessage.classList.remove('hidden');
      //           this.error = true;
      //           return;
      //         } else if (!this.cart) {
      //           window.location = window.routes.cart_url;
      //           return;
      //         }

      //         const startMarker = CartPerformance.createStartingMarker('add:wait-for-subscribers');
      //         if (!this.error)
      //           publish(PUB_SUB_EVENTS.cartUpdate, {
      //             source: 'product-form',
      //             productVariantId: mainVariantId,
      //             cartData: response,
      //           }).then(() => {
      //             CartPerformance.measureFromMarker('add:wait-for-subscribers', startMarker);
      //           });
      //         this.error = false;
      //         const quickAddModal = this.closest('quick-add-modal');
      //         if (quickAddModal) {
      //           document.body.addEventListener(
      //             'modalClosed',
      //             () => {
      //               setTimeout(() => {
      //                 CartPerformance.measure('add:paint-updated-sections', () => {
      //                   this.cart.renderContents(response);
      //                 });
      //               });
      //             },
      //             { once: true }
      //           );
      //           quickAddModal.hide(true);
      //         } else {
      //           CartPerformance.measure('add:paint-updated-sections', () => {
      //             this.cart.renderContents(response);
      //           });
      //         }
      //       })
      //       .catch((e) => {
      //         console.error(e);
      //       })
      //       .finally(() => {
      //         this.submitButton.classList.remove('loading');
      //         if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
      //         if (!this.error) this.submitButton.removeAttribute('aria-disabled');
      //         this.querySelector('.loading__spinner').classList.add('hidden');

      //         CartPerformance.measureFromEvent('add:user-action', evt);
      //       });

      //     return; // stop default form submission;
      //   }

      //   // No bundle products selected, do default single product add-to-cart
      //   const formData = new FormData(this.form);
      //   if (this.cart) {
      //     formData.append(
      //       'sections',
      //       this.cart.getSectionsToRender().map((section) => section.id)
      //     );
      //     formData.append('sections_url', window.location.pathname);
      //     this.cart.setActiveElement(document.activeElement);
      //   }

      //   const config = fetchConfig('javascript');
      //   config.headers['X-Requested-With'] = 'XMLHttpRequest';
      //   delete config.headers['Content-Type'];
      //   config.body = formData;

      //   fetch(`${routes.cart_add_url}`, config)
      //     .then((response) => response.json())
      //     .then((response) => {
      //       if (response.status) {
      //         publish(PUB_SUB_EVENTS.cartError, {
      //           source: 'product-form',
      //           productVariantId: formData.get('id'),
      //           errors: response.errors || response.description,
      //           message: response.message,
      //         });
      //         this.handleErrorMessage(response.description);

      //         const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
      //         if (!soldOutMessage) return;
      //         this.submitButton.setAttribute('aria-disabled', true);
      //         this.submitButtonText.classList.add('hidden');
      //         soldOutMessage.classList.remove('hidden');
      //         this.error = true;
      //         return;
      //       } else if (!this.cart) {
      //         window.location = window.routes.cart_url;
      //         return;
      //       }

      //       const startMarker = CartPerformance.createStartingMarker('add:wait-for-subscribers');
      //       if (!this.error)
      //         publish(PUB_SUB_EVENTS.cartUpdate, {
      //           source: 'product-form',
      //           productVariantId: formData.get('id'),
      //           cartData: response,
      //         }).then(() => {
      //           CartPerformance.measureFromMarker('add:wait-for-subscribers', startMarker);
      //         });
      //       this.error = false;
      //       const quickAddModal = this.closest('quick-add-modal');
      //       if (quickAddModal) {
      //         document.body.addEventListener(
      //           'modalClosed',
      //           () => {
      //             setTimeout(() => {
      //               CartPerformance.measure('add:paint-updated-sections', () => {
      //                 this.cart.renderContents(response);
      //               });
      //             });
      //           },
      //           { once: true }
      //         );
      //         quickAddModal.hide(true);
      //       } else {
      //         CartPerformance.measure('add:paint-updated-sections', () => {
      //           this.cart.renderContents(response);
      //         });
      //       }
      //     })
      //     .catch((e) => {
      //       console.error(e);
      //     })
      //     .finally(() => {
      //       this.submitButton.classList.remove('loading');
      //       if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
      //       if (!this.error) this.submitButton.removeAttribute('aria-disabled');
      //       this.querySelector('.loading__spinner').classList.add('hidden');

      //       CartPerformance.measureFromEvent('add:user-action', evt);
      //     });
      // }

      // Test code 1: Below code is to fix the above issue(Failed)
      // onSubmitHandler(evt) {
      //   evt.preventDefault();
      //   if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

      //   this.handleErrorMessage();

      //   this.submitButton.setAttribute('aria-disabled', true);
      //   this.submitButton.classList.add('loading');
      //   this.querySelector('.loading__spinner').classList.remove('hidden');

      //   const bundleCheckboxes = this.form.querySelectorAll('input[name="bundle_products[]"]:checked');
      //   const mainVariantId = this.variantIdInput.value;

      //   if (bundleCheckboxes.length > 0) {
      //     // Prepare unique group ID for this bundle add
      //     const bundleGroupId = 'bundle_group_' + Date.now();
      //     // Prepare items array for batch add
      //     const items = [
      //       {
      //         id: mainVariantId,
      //         quantity: 1,
      //         properties: {
      //           _bundle_group: bundleGroupId
      //         }
      //       }
      //     ];

      //     bundleCheckboxes.forEach((checkbox) => {
      //       items.push({
      //         id: checkbox.value,
      //         quantity: 1,
      //         properties: {
      //           _bundle_group: bundleGroupId
      //         }
      //       });
      //     });

      //     fetch('/cart/add.js', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'X-Requested-With': 'XMLHttpRequest',
      //       },
      //       body: JSON.stringify({ items })
      //     })
      //       .then((response) => response.json())
      //       .then((response) => {
      //         if (response.status) {
      //           this.handleErrorMessage(response.description);

      //           const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
      //           if (!soldOutMessage) return;
      //           this.submitButton.setAttribute('aria-disabled', true);
      //           this.submitButtonText.classList.add('hidden');
      //           soldOutMessage.classList.remove('hidden');
      //           this.error = true;
      //           return;
      //         } else if (!this.cart) {
      //           window.location = window.routes.cart_url;
      //           return;
      //         }

      //         // Now fetch updated cart drawer and notification sections HTML
      //         return fetch(`/?sections=${this.cart.getSectionsToRender().map((section) => section.id).join(',')}`)
      //           .then((sectionResponse) => sectionResponse.json())
      //           .then((sections) => {
      //             // Update cart drawer and notification HTML
      //             this.cart.getSectionsToRender().forEach((sectionId) => {
      //               const element = document.querySelector(`${sectionId}`);
      //               if (element && sections[sectionId]) {
      //                 element.innerHTML = sections[sectionId];
      //               }
      //             });

      //             // Optionally open cart drawer if your theme supports it
      //             if (typeof this.cart.open === 'function') {
      //               this.cart.open();
      //             }

      //             // Publish cart update event as before
      //             const startMarker = CartPerformance.createStartingMarker('add:wait-for-subscribers');
      //             if (!this.error)
      //               publish(PUB_SUB_EVENTS.cartUpdate, {
      //                 source: 'product-form',
      //                 productVariantId: mainVariantId,
      //                 cartData: response,
      //               }).then(() => {
      //                 CartPerformance.measureFromMarker('add:wait-for-subscribers', startMarker);
      //               });

      //             this.error = false;

      //             const quickAddModal = this.closest('quick-add-modal');
      //             if (quickAddModal) {
      //               document.body.addEventListener(
      //                 'modalClosed',
      //                 () => {
      //                   setTimeout(() => {
      //                     CartPerformance.measure('add:paint-updated-sections', () => {
      //                       this.cart.renderContents(response);
      //                     });
      //                   });
      //                 },
      //                 { once: true }
      //               );
      //               quickAddModal.hide(true);
      //             }
      //           });
      //       })
      //       .catch((e) => {
      //         console.error(e);
      //       })
      //       .finally(() => {
      //         this.submitButton.classList.remove('loading');
      //         if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
      //         if (!this.error) this.submitButton.removeAttribute('aria-disabled');
      //         this.querySelector('.loading__spinner').classList.add('hidden');

      //         CartPerformance.measureFromEvent('add:user-action', evt);
      //       });

      //     return; // stop default form submission;
      //   }

      //   // No bundle products selected, do default single product add-to-cart
      //   const formData = new FormData(this.form);
      //   if (this.cart) {
      //     formData.append(
      //       'sections',
      //       this.cart.getSectionsToRender().map((section) => section.id)
      //     );
      //     formData.append('sections_url', window.location.pathname);
      //     this.cart.setActiveElement(document.activeElement);
      //   }

      //   const config = fetchConfig('javascript');
      //   config.headers['X-Requested-With'] = 'XMLHttpRequest';
      //   delete config.headers['Content-Type'];
      //   config.body = formData;

      //   fetch(`${routes.cart_add_url}`, config)
      //     .then((response) => response.json())
      //     .then((response) => {
      //       if (response.status) {
      //         publish(PUB_SUB_EVENTS.cartError, {
      //           source: 'product-form',
      //           productVariantId: formData.get('id'),
      //           errors: response.errors || response.description,
      //           message: response.message,
      //         });
      //         this.handleErrorMessage(response.description);

      //         const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
      //         if (!soldOutMessage) return;
      //         this.submitButton.setAttribute('aria-disabled', true);
      //         this.submitButtonText.classList.add('hidden');
      //         soldOutMessage.classList.remove('hidden');
      //         this.error = true;
      //         return;
      //       } else if (!this.cart) {
      //         window.location = window.routes.cart_url;
      //         return;
      //       }

      //       const startMarker = CartPerformance.createStartingMarker('add:wait-for-subscribers');
      //       if (!this.error)
      //         publish(PUB_SUB_EVENTS.cartUpdate, {
      //           source: 'product-form',
      //           productVariantId: formData.get('id'),
      //           cartData: response,
      //         }).then(() => {
      //           CartPerformance.measureFromMarker('add:wait-for-subscribers', startMarker);
      //         });
      //       this.error = false;
      //       const quickAddModal = this.closest('quick-add-modal');
      //       if (quickAddModal) {
      //         document.body.addEventListener(
      //           'modalClosed',
      //           () => {
      //             setTimeout(() => {
      //               CartPerformance.measure('add:paint-updated-sections', () => {
      //                 this.cart.renderContents(response);
      //               });
      //             });
      //           },
      //           { once: true }
      //         );
      //         quickAddModal.hide(true);
      //       } else {
      //         CartPerformance.measure('add:paint-updated-sections', () => {
      //           this.cart.renderContents(response);
      //         });
      //       }
      //     })
      //     .catch((e) => {
      //       console.error(e);
      //     })
      //     .finally(() => {
      //       this.submitButton.classList.remove('loading');
      //       if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
      //       if (!this.error) this.submitButton.removeAttribute('aria-disabled');
      //       this.querySelector('.loading__spinner').classList.add('hidden');

      //       CartPerformance.measureFromEvent('add:user-action', evt);
      //     });
      // }

      // Test code 2: 
      //       onSubmitHandler(evt) {
      //   evt.preventDefault();
      //   if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

      //   this.handleErrorMessage();

      //   this.submitButton.setAttribute('aria-disabled', true);
      //   this.submitButton.classList.add('loading');
      //   this.querySelector('.loading__spinner').classList.remove('hidden');

      //   const bundleCheckboxes = this.form.querySelectorAll('input[name="bundle_products[]"]:checked');
      //   const mainVariantId = this.variantIdInput.value;

      //   if (bundleCheckboxes.length > 0) {
      //     const bundleGroupId = 'bundle_group_' + Date.now();
      //     const items = [
      //       {
      //         id: mainVariantId,
      //         quantity: 1,
      //         properties: {
      //           _bundle_group: bundleGroupId
      //         }
      //       }
      //     ];

      //     bundleCheckboxes.forEach((checkbox) => {
      //       items.push({
      //         id: checkbox.value,
      //         quantity: 1,
      //         properties: {
      //           _bundle_group: bundleGroupId
      //         }
      //       });
      //     });

      //     fetch('/cart/add.js', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'X-Requested-With': 'XMLHttpRequest',
      //       },
      //       body: JSON.stringify({ items }),
      //     })
      //       .then((response) => response.json())
      //       .then((cart) => {
      //         if (cart.status) {
      //           // error handling
      //           this.handleErrorMessage(cart.description);
      //           const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
      //           if (!soldOutMessage) return;
      //           this.submitButton.setAttribute('aria-disabled', true);
      //           this.submitButtonText.classList.add('hidden');
      //           soldOutMessage.classList.remove('hidden');
      //           this.error = true;
      //           return;
      //         } else if (!this.cart) {
      //           // fallback redirect if no cart drawer or notification
      //           window.location = window.routes.cart_url;
      //           return;
      //         }

      //         // Use the cart drawer's renderContents to update and open drawer correctly
      //         this.cart.renderContents(cart);

      //         // Publish cart update event
      //         const startMarker = CartPerformance.createStartingMarker('add:wait-for-subscribers');
      //         if (!this.error)
      //           publish(PUB_SUB_EVENTS.cartUpdate, {
      //             source: 'product-form',
      //             productVariantId: mainVariantId,
      //             cartData: cart,
      //           }).then(() => {
      //             CartPerformance.measureFromMarker('add:wait-for-subscribers', startMarker);
      //           });

      //         this.error = false;

      //         const quickAddModal = this.closest('quick-add-modal');
      //         if (quickAddModal) {
      //           document.body.addEventListener(
      //             'modalClosed',
      //             () => {
      //               setTimeout(() => {
      //                 CartPerformance.measure('add:paint-updated-sections', () => {
      //                   this.cart.renderContents(cart);
      //                 });
      //               });
      //             },
      //             { once: true }
      //           );
      //           quickAddModal.hide(true);
      //         }
      //       })
      //       .catch((e) => {
      //         console.error(e);
      //       })
      //       .finally(() => {
      //         this.submitButton.classList.remove('loading');
      //         if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
      //         if (!this.error) this.submitButton.removeAttribute('aria-disabled');
      //         this.querySelector('.loading__spinner').classList.add('hidden');

      //         CartPerformance.measureFromEvent('add:user-action', evt);
      //       });

      //     return; // Prevent default form submission
      //   }

      //   // No bundle products selected, execute your theme's default single variant form submit logic
      //   const formData = new FormData(this.form);

      //   if (this.cart) {
      //     formData.append(
      //       'sections',
      //       this.cart.getSectionsToRender().map((section) => section.id).join(',')
      //     );
      //     formData.append('sections_url', window.location.pathname);
      //     this.cart.setActiveElement(document.activeElement);
      //   }

      //   const config = fetchConfig('javascript');
      //   config.headers['X-Requested-With'] = 'XMLHttpRequest';
      //   delete config.headers['Content-Type'];
      //   config.body = formData;

      //   fetch(`${routes.cart_add_url}`, config)
      //     .then((response) => response.json())
      //     .then((cart) => {
      //       if (cart.status) {
      //         publish(PUB_SUB_EVENTS.cartError, {
      //           source: 'product-form',
      //           productVariantId: formData.get('id'),
      //           errors: cart.errors || cart.description,
      //           message: cart.message,
      //         });
      //         this.handleErrorMessage(cart.description);
      //         const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
      //         if (!soldOutMessage) return;
      //         this.submitButton.setAttribute('aria-disabled', true);
      //         this.submitButtonText.classList.add('hidden');
      //         soldOutMessage.classList.remove('hidden');
      //         this.error = true;
      //         return;
      //       } else if (!this.cart) {
      //         window.location = window.routes.cart_url;
      //         return;
      //       }

      //       this.cart.renderContents(cart);

      //       const startMarker = CartPerformance.createStartingMarker('add:wait-for-subscribers');
      //       if (!this.error)
      //         publish(PUB_SUB_EVENTS.cartUpdate, {
      //           source: 'product-form',
      //           productVariantId: formData.get('id'),
      //           cartData: cart,
      //         }).then(() => {
      //           CartPerformance.measureFromMarker('add:wait-for-subscribers', startMarker);
      //         });

      //       this.error = false;
      //       const quickAddModal = this.closest('quick-add-modal');
      //       if (quickAddModal) {
      //         document.body.addEventListener(
      //           'modalClosed',
      //           () => {
      //             setTimeout(() => {
      //               CartPerformance.measure('add:paint-updated-sections', () => {
      //                 this.cart.renderContents(cart);
      //               });
      //             });
      //           },
      //           { once: true }
      //         );
      //         quickAddModal.hide(true);
      //       }
      //     })
      //     .catch((e) => {
      //       console.error(e);
      //     })
      //     .finally(() => {
      //       this.submitButton.classList.remove('loading');
      //       if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
      //       if (!this.error) this.submitButton.removeAttribute('aria-disabled');
      //       this.querySelector('.loading__spinner').classList.add('hidden');

      //       CartPerformance.measureFromEvent('add:user-action', evt);
      //     });
      // }

      //Bundle product change start
      // test 3: copilet (worked)
      // ...existing code...
      onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading__spinner').classList.remove('hidden');

        const bundleCheckboxes = this.form.querySelectorAll('input[name="bundle_products[]"]:checked');
        const mainVariantId = this.variantIdInput.value;

        if (bundleCheckboxes.length > 0) {
          // Prepare items array for batch add
          const bundleGroupId = 'bundle_group_' + Date.now();
          const items = [
            {
              id: mainVariantId,
              quantity: 1,
              properties: {
                _bundle_group: bundleGroupId
              }
            }
          ];

          bundleCheckboxes.forEach((checkbox) => {
            items.push({
              id: checkbox.value,
              quantity: 1,
              properties: {
                _bundle_group: bundleGroupId
              }
            });
          });

          fetch('/cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({ items })
          })
            .then((response) => response.json())
            .then((response) => {
              if (response.status) {
                this.handleErrorMessage(response.description);

                const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
                if (!soldOutMessage) return;
                this.submitButton.setAttribute('aria-disabled', true);
                this.submitButtonText.classList.add('hidden');
                soldOutMessage.classList.remove('hidden');
                this.error = true;
                return;
              } else if (!this.cart) {
                window.location = window.routes.cart_url;
                return;
              }

              // Fetch updated cart sections for drawer/notification
              const sections = this.cart.getSectionsToRender().map((section) => section.id).join(',');
              fetch(`/?sections=${sections}`)
                .then((sectionRes) => sectionRes.json())
                .then((sectionsData) => {
                  // Compose a fake cart state with sections for renderContents
                  const parsedState = {
                    ...response,
                    sections: sectionsData
                  };
                  this.cart.renderContents(parsedState);

                  // Publish cart update event
                  const startMarker = CartPerformance.createStartingMarker('add:wait-for-subscribers');
                  if (!this.error)
                    publish(PUB_SUB_EVENTS.cartUpdate, {
                      source: 'product-form',
                      productVariantId: mainVariantId,
                      cartData: parsedState,
                    }).then(() => {
                      CartPerformance.measureFromMarker('add:wait-for-subscribers', startMarker);
                    });

                  this.error = false;

                  const quickAddModal = this.closest('quick-add-modal');
                  if (quickAddModal) {
                    document.body.addEventListener(
                      'modalClosed',
                      () => {
                        setTimeout(() => {
                          CartPerformance.measure('add:paint-updated-sections', () => {
                            this.cart.renderContents(parsedState);
                          });
                        });
                      },
                      { once: true }
                    );
                    quickAddModal.hide(true);
                  }
                });
            })
            .catch((e) => {
              console.error(e);
            })
            .finally(() => {
              this.submitButton.classList.remove('loading');
              if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
              if (!this.error) this.submitButton.removeAttribute('aria-disabled');
              this.querySelector('.loading__spinner').classList.add('hidden');

              CartPerformance.measureFromEvent('add:user-action', evt);
            });

          return; // stop default form submission;
        }

        // No bundle products selected, do default single product add-to-cart
        const formData = new FormData(this.form);
        if (this.cart) {
          formData.append(
            'sections',
            this.cart.getSectionsToRender().map((section) => section.id).join(',')
          );
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];
        config.body = formData;

        fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                errors: response.errors || response.description,
                message: response.message,
              });
              this.handleErrorMessage(response.description);

              const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButtonText.classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this.error = true;
              return;
            } else if (!this.cart) {
              window.location = window.routes.cart_url;
              return;
            }

            // Fetch updated cart sections for drawer/notification
            const sections = this.cart.getSectionsToRender().map((section) => section.id).join(',');
            fetch(`/?sections=${sections}`)
              .then((sectionRes) => sectionRes.json())
              .then((sectionsData) => {
                const parsedState = {
                  ...response,
                  sections: sectionsData
                };
                this.cart.renderContents(parsedState);

                const startMarker = CartPerformance.createStartingMarker('add:wait-for-subscribers');
                if (!this.error)
                  publish(PUB_SUB_EVENTS.cartUpdate, {
                    source: 'product-form',
                    productVariantId: formData.get('id'),
                    cartData: parsedState,
                  }).then(() => {
                    CartPerformance.measureFromMarker('add:wait-for-subscribers', startMarker);
                  });

                this.error = false;
                const quickAddModal = this.closest('quick-add-modal');
                if (quickAddModal) {
                  document.body.addEventListener(
                    'modalClosed',
                    () => {
                      setTimeout(() => {
                        CartPerformance.measure('add:paint-updated-sections', () => {
                          this.cart.renderContents(parsedState);
                        });
                      });
                    },
                    { once: true }
                  );
                  quickAddModal.hide(true);
                }
              });
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.submitButton.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButton.removeAttribute('aria-disabled');
            this.querySelector('.loading__spinner').classList.add('hidden');

            CartPerformance.measureFromEvent('add:user-action', evt);
          });
      }
      // ...existing code...
      //Bundle product change end

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }

      toggleSubmitButton(disable = true, text) {
        if (disable) {
          this.submitButton.setAttribute('disabled', 'disabled');
          if (text) this.submitButtonText.textContent = text;
        } else {
          this.submitButton.removeAttribute('disabled');
          this.submitButtonText.textContent = window.variantStrings.addToCart;
        }
      }

      get variantIdInput() {
        return this.form.querySelector('[name=id]');
      }
    }
  );
}
