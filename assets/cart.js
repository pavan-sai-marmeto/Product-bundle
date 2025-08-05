class CartRemoveButton extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', (event) => {
      event.preventDefault();
      const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
      cartItems.updateQuantity(this.dataset.index, 0, event);
    });
  }
}

customElements.define('cart-remove-button', CartRemoveButton);

//the below code is not removing the bundle parent and its children
// class CartRemoveButton extends HTMLElement {
//   constructor() {
//     super();

//     this.addEventListener('click', async (event) => {
//       event.preventDefault();
//       const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
//       const index = this.dataset.index;

//       // Fetch cart to get line item properties
//       const cartRes = await fetch('/cart.js');
//       const cartData = await cartRes.json();
//       const lineIndex = parseInt(index, 10) - 1;
//       const lineItem = cartData.items[lineIndex];

//       // Check if this is a bundle parent (has _bundle_group property)
//       if (lineItem && lineItem.properties && lineItem.properties._bundle_group) {
//         const bundleGroup = lineItem.properties._bundle_group;

//         // Find all line indexes with the same _bundle_group
//         const linesToRemove = [];
//         cartData.items.forEach((item, idx) => {
//           if (item.properties && item.properties._bundle_group === bundleGroup) {
//             linesToRemove.push(idx + 1); // Shopify line numbers are 1-based
//           }
//         });

//         // Remove all items in the bundle group
//         for (const line of linesToRemove) {
//           await cartItems.updateQuantity(line, 0, event);
//         }
//       } else {
//         // Default: remove only this item
//         cartItems.updateQuantity(index, 0, event);
//       }
//     });
//   }
// }

// customElements.define('cart-remove-button', CartRemoveButton);


// the below code is removing the add on products one by one

// class CartRemoveButton extends HTMLElement {
//   constructor() {
//     super();

//     this.addEventListener('click', async (event) => {
//       event.preventDefault();
//       const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
//       const index = this.dataset.index;

//       // Fetch cart to get line item properties
//       const cartRes = await fetch('/cart.js');
//       const cartData = await cartRes.json();
//       const lineIndex = parseInt(index, 10) - 1;
//       const lineItem = cartData.items[lineIndex];

//       // Check if this is a bundle parent (has _bundle_group property)
//       if (lineItem && lineItem.properties && lineItem.properties._bundle_group) {
//         const bundleGroup = lineItem.properties._bundle_group;

//         // Find all line indexes with the same _bundle_group
//         const linesToRemove = [];
//         cartData.items.forEach((item, idx) => {
//           if (item.properties && item.properties._bundle_group === bundleGroup) {
//             linesToRemove.push(idx + 1); // Shopify line numbers are 1-based
//           }
//         });

//         // Remove all items in the bundle group in reverse order to avoid shifting indexes
//         for (const line of linesToRemove.sort((a, b) => b - a)) {
//           await cartItems.updateQuantity(line, 0, event);
//         }
//       } else {
//         // Default: remove only this item
//         cartItems.updateQuantity(index, 0, event);
//       }
//     });
//   }
// }

// customElements.define('cart-remove-button', CartRemoveButton);


// the below code is getting 422 response code in console
// class CartRemoveButton extends HTMLElement {
//   constructor() {
//     super();

//     this.addEventListener('click', async (event) => {
//       event.preventDefault();
//       const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
//       const index = this.dataset.index;

//       // Fetch cart to get line item properties
//       const cartRes = await fetch('/cart.js');
//       const cartData = await cartRes.json();
//       const lineIndex = parseInt(index, 10) - 1;
//       const lineItem = cartData.items[lineIndex];

//       // Check if this is a bundle parent (has _bundle_group property)
//       if (lineItem && lineItem.properties && lineItem.properties._bundle_group) {
//         const bundleGroup = lineItem.properties._bundle_group;

//         // Find all line indexes with the same _bundle_group
//         const linesToRemove = [];
//         cartData.items.forEach((item, idx) => {
//           if (item.properties && item.properties._bundle_group === bundleGroup) {
//             linesToRemove.push(idx + 1); // Shopify line numbers are 1-based
//           }
//         });

//         // Build updates array for all lines to remove
//         const updates = {};
//         linesToRemove.forEach(line => {
//           updates[line] = 0;
//         });

//         // Send a single request to update all lines at once
//         fetch('/cart/update.js', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-Requested-With': 'XMLHttpRequest',
//           },
//           body: JSON.stringify({ updates })
//         }).then(() => {
//           // Refresh cart sections
//           if (cartItems.onCartUpdate) {
//             cartItems.onCartUpdate();
//           } else {
//             window.location.reload();
//           }
//         });
//       } else {
//         // Default: remove only this item
//         cartItems.updateQuantity(index, 0, event);
//       }
//     });
//   }
// }

// customElements.define('cart-remove-button', CartRemoveButton);

// the below code is getting the error
// class CartRemoveButton extends HTMLElement {
//   constructor() {
//     super();

//     this.addEventListener('click', async (event) => {
//       event.preventDefault();
//       const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
//       const index = this.dataset.index;

//       // Fetch cart to get line item properties
//       const cartRes = await fetch('/cart.js');
//       const cartData = await cartRes.json();
//       const lineIndex = parseInt(index, 10) - 1;
//       const lineItem = cartData.items[lineIndex];

//       // Check if this is a bundle parent (has _bundle_group property)
//       if (lineItem && lineItem.properties && lineItem.properties._bundle_group) {
//         const bundleGroup = lineItem.properties._bundle_group;

//         // Find all line indexes with the same _bundle_group
//         const linesToRemove = [];
//         cartData.items.forEach((item, idx) => {
//           if (item.properties && item.properties._bundle_group === bundleGroup) {
//             linesToRemove.push(idx + 1); // Shopify line numbers are 1-based
//           }
//         });

//         // Remove duplicates and sort descending
//         const uniqueLines = [...new Set(linesToRemove)].sort((a, b) => b - a);

//         // Build updates object
//         const updates = {};
//         uniqueLines.forEach(line => {
//           updates[line] = 0;
//         });

//         // Only send if there are lines to remove
//         if (uniqueLines.length > 0) {
//           fetch('/cart/update.js', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'X-Requested-With': 'XMLHttpRequest',
//             },
//             body: JSON.stringify({ updates })
//           }).then((res) => {
//             if (res.ok) {
//               if (cartItems.onCartUpdate) {
//                 cartItems.onCartUpdate();
//               } else {
//                 window.location.reload();
//               }
//             } else {
//               window.location.reload();
//             }
//           });
//         }
//       } else {
//         // Default: remove only this item
//         cartItems.updateQuantity(index, 0, event);
//       }
//     });
//   }
// }

// customElements.define('cart-remove-button', CartRemoveButton);

// this code is removing the items but removing the wrong items
// class CartRemoveButton extends HTMLElement {
//   constructor() {
//     super();

//     this.addEventListener('click', async (event) => {
//       event.preventDefault();
//       const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
//       const index = this.dataset.index;

//       // Fetch cart to get line item properties
//       let cartRes = await fetch('/cart.js');
//       let cartData = await cartRes.json();
//       let lineIndex = parseInt(index, 10) - 1;
//       let lineItem = cartData.items[lineIndex];

//       // Check if this is a bundle parent (has _bundle_group property)
//       if (lineItem && lineItem.properties && lineItem.properties._bundle_group) {
//         const bundleGroup = lineItem.properties._bundle_group;

//         // Find all line indexes with the same _bundle_group
//         let linesToRemove = [];
//         cartData.items.forEach((item, idx) => {
//           if (item.properties && item.properties._bundle_group === bundleGroup) {
//             linesToRemove.push(idx + 1); // Shopify line numbers are 1-based
//           }
//         });

//         // Remove each line one by one, always fetching the latest cart state
//         for (let i = 0; i < linesToRemove.length; i++) {
//           // Always fetch the latest cart state before removing
//           cartRes = await fetch('/cart.js');
//           cartData = await cartRes.json();
//           // Find the current line number for this bundle group item
//           let currentLine = null;
//           cartData.items.forEach((item, idx) => {
//             if (item.properties && item.properties._bundle_group === bundleGroup) {
//               currentLine = idx + 1;
//             }
//           });
//           if (currentLine) {
//             await cartItems.updateQuantity(currentLine, 0, event);
//           }
//         }

//         // After all are removed, refresh cart
//         if (cartItems.onCartUpdate) {
//           cartItems.onCartUpdate();
//         } else {
//           window.location.reload();
//         }
//       } else {
//         // Default: remove only this item
//         cartItems.updateQuantity(index, 0, event);
//       }
//     });
//   }
// }

// customElements.define('cart-remove-button', CartRemoveButton);


// the below code is working but an extra item is removed from cart and getting 422 response with error errors: "line parameter is invalid."
// class CartRemoveButton extends HTMLElement {
//   constructor() {
//     super();

//     this.addEventListener('click', async (event) => {
//       event.preventDefault();
//       const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
//       const index = this.dataset.index;

//       // Fetch cart to get line item properties
//       let cartRes = await fetch('/cart.js');
//       let cartData = await cartRes.json();
//       let lineIndex = parseInt(index, 10) - 1;
//       let lineItem = cartData.items[lineIndex];

//       // If this is a bundle parent (has _bundle_group property)
//       if (lineItem && lineItem.properties && lineItem.properties._bundle_group) {
//         const bundleGroup = lineItem.properties._bundle_group;

//         // Remove all items with the same _bundle_group identifier
//         let stillRemoving = true;
//         while (stillRemoving) {
//           // Always fetch the latest cart state
//           cartRes = await fetch('/cart.js');
//           cartData = await cartRes.json();

//           // Find the first item with the bundleGroup
//           let found = false;
//           for (let i = 0; i < cartData.items.length; i++) {
//             const item = cartData.items[i];
//             if (item.properties && item.properties._bundle_group === bundleGroup) {
//               // Remove this item by its current line number
//               await cartItems.updateQuantity(i + 1, 0, event);
//               found = true;
//               break; // Remove one at a time, then re-fetch
//             }
//           }
//           if (!found) stillRemoving = false;
//         }

//         // After all are removed, refresh cart
//         if (cartItems.onCartUpdate) {
//           cartItems.onCartUpdate();
//         } else {
//           window.location.reload();
//         }
//       } else {
//         // Default: remove only this item
//         cartItems.updateQuantity(index, 0, event);
//       }
//     });
//   }
// }

// customElements.define('cart-remove-button', CartRemoveButton);

// the below code is not working
// class CartRemoveButton extends HTMLElement {
//   constructor() {
//     super();

//     this.addEventListener('click', async (event) => {
//       event.preventDefault();
//       const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
//       const index = this.dataset.index;

//       // Fetch the latest cart state
//       const cartRes = await fetch('/cart.js');
//       const cartData = await cartRes.json();
//       const lineIndex = parseInt(index, 10) - 1;
//       const lineItem = cartData.items[lineIndex];

//       // If this is a bundle parent (has _bundle_group property)
//       if (lineItem && lineItem.properties && lineItem.properties._bundle_group) {
//         const bundleGroup = lineItem.properties._bundle_group;

//         // Collect all line numbers for this bundle group
//         const updates = {};
//         cartData.items.forEach((item, idx) => {
//           if (item.properties && item.properties._bundle_group === bundleGroup) {
//             updates[idx + 1] = 0; // Shopify line numbers are 1-based
//           }
//         });

//         // Only send if there are lines to remove
//         if (Object.keys(updates).length > 0) {
//           fetch('/cart/update.js', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'X-Requested-With': 'XMLHttpRequest',
//             },
//             body: JSON.stringify({ updates })
//           }).then((res) => {
//             if (cartItems.onCartUpdate) {
//               cartItems.onCartUpdate();
//             } else {
//               window.location.reload();
//             }
//           });
//         }
//       } else {
//         // Default: remove only this item
//         cartItems.updateQuantity(index, 0, event);
//       }
//     });
//   }
// }

// customElements.define('cart-remove-button', CartRemoveButton);




class CartItems extends HTMLElement {
  constructor() {
    super();
    this.lineItemStatusElement =
      document.getElementById('shopping-cart-line-item-status') || document.getElementById('CartDrawer-LineItemStatus');

    const debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, ON_CHANGE_DEBOUNCE_TIMER);

    this.addEventListener('change', debouncedOnChange.bind(this));
  }

  cartUpdateUnsubscriber = undefined;

  connectedCallback() {
    this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      if (event.source === 'cart-items') {
        return;
      }
      return this.onCartUpdate();
    });
  }

  disconnectedCallback() {
    if (this.cartUpdateUnsubscriber) {
      this.cartUpdateUnsubscriber();
    }
  }

  resetQuantityInput(id) {
    const input = this.querySelector(`#Quantity-${id}`);
    input.value = input.getAttribute('value');
    this.isEnterPressed = false;
  }

  setValidity(event, index, message) {
    event.target.setCustomValidity(message);
    event.target.reportValidity();
    this.resetQuantityInput(index);
    event.target.select();
  }

  validateQuantity(event) {
    const inputValue = parseInt(event.target.value);
    const index = event.target.dataset.index;
    let message = '';

    if (inputValue < event.target.dataset.min) {
      message = window.quickOrderListStrings.min_error.replace('[min]', event.target.dataset.min);
    } else if (inputValue > parseInt(event.target.max)) {
      message = window.quickOrderListStrings.max_error.replace('[max]', event.target.max);
    } else if (inputValue % parseInt(event.target.step) !== 0) {
      message = window.quickOrderListStrings.step_error.replace('[step]', event.target.step);
    }

    if (message) {
      this.setValidity(event, index, message);
    } else {
      event.target.setCustomValidity('');
      event.target.reportValidity();
      this.updateQuantity(
        index,
        inputValue,
        event,
        document.activeElement.getAttribute('name'),
        event.target.dataset.quantityVariantId
      );
    }
  }

  onChange(event) {
    this.validateQuantity(event);
  }

  onCartUpdate() {
    if (this.tagName === 'CART-DRAWER-ITEMS') {
      return fetch(`${routes.cart_url}?section_id=cart-drawer`)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, 'text/html');
          const selectors = ['cart-drawer-items', '.cart-drawer__footer'];
          for (const selector of selectors) {
            const targetElement = document.querySelector(selector);
            const sourceElement = html.querySelector(selector);
            if (targetElement && sourceElement) {
              targetElement.replaceWith(sourceElement);
            }
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      return fetch(`${routes.cart_url}?section_id=main-cart-items`)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, 'text/html');
          const sourceQty = html.querySelector('cart-items');
          this.innerHTML = sourceQty.innerHTML;
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  getSectionsToRender() {
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section',
      },
      {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section',
      },
      {
        id: 'main-cart-footer',
        section: document.getElementById('main-cart-footer').dataset.id,
        selector: '.js-contents',
      },
    ];
  }

  updateQuantity(line, quantity, event, name, variantId) {
    this.enableLoading(line);

    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname,
    });
    const eventTarget = event.currentTarget instanceof CartRemoveButton ? 'clear' : 'change';

    fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);

        CartPerformance.measure(`${eventTarget}:paint-updated-sections"`, () => {
          const quantityElement =
            document.getElementById(`Quantity-${line}`) || document.getElementById(`Drawer-quantity-${line}`);
          const items = document.querySelectorAll('.cart-item');

          if (parsedState.errors) {
            quantityElement.value = quantityElement.getAttribute('value');
            this.updateLiveRegions(line, parsedState.errors);
            return;
          }

          this.classList.toggle('is-empty', parsedState.item_count === 0);
          const cartDrawerWrapper = document.querySelector('cart-drawer');
          const cartFooter = document.getElementById('main-cart-footer');

          if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
          if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

          this.getSectionsToRender().forEach((section) => {
            const elementToReplace =
              document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
            elementToReplace.innerHTML = this.getSectionInnerHTML(
              parsedState.sections[section.section],
              section.selector
            );
          });
          const updatedValue = parsedState.items[line - 1] ? parsedState.items[line - 1].quantity : undefined;
          let message = '';
          if (items.length === parsedState.items.length && updatedValue !== parseInt(quantityElement.value)) {
            if (typeof updatedValue === 'undefined') {
              message = window.cartStrings.error;
            } else {
              message = window.cartStrings.quantityError.replace('[quantity]', updatedValue);
            }
          }
          this.updateLiveRegions(line, message);

          const lineItem =
            document.getElementById(`CartItem-${line}`) || document.getElementById(`CartDrawer-Item-${line}`);
          if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
            cartDrawerWrapper
              ? trapFocus(cartDrawerWrapper, lineItem.querySelector(`[name="${name}"]`))
              : lineItem.querySelector(`[name="${name}"]`).focus();
          } else if (parsedState.item_count === 0 && cartDrawerWrapper) {
            trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'));
          } else if (document.querySelector('.cart-item') && cartDrawerWrapper) {
            trapFocus(cartDrawerWrapper, document.querySelector('.cart-item__name'));
          }
        });

        CartPerformance.measureFromEvent(`${eventTarget}:user-action`, event);

        publish(PUB_SUB_EVENTS.cartUpdate, { source: 'cart-items', cartData: parsedState, variantId: variantId });
      })
      .catch(() => {
        this.querySelectorAll('.loading__spinner').forEach((overlay) => overlay.classList.add('hidden'));
        const errors = document.getElementById('cart-errors') || document.getElementById('CartDrawer-CartErrors');
        errors.textContent = window.cartStrings.error;
      })
      .finally(() => {
        this.disableLoading(line);
      });
  }

  updateLiveRegions(line, message) {
    const lineItemError =
      document.getElementById(`Line-item-error-${line}`) || document.getElementById(`CartDrawer-LineItemError-${line}`);
    if (lineItemError) lineItemError.querySelector('.cart-item__error-text').textContent = message;

    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus =
      document.getElementById('cart-live-region-text') || document.getElementById('CartDrawer-LiveRegionText');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.add('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading__spinner`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading__spinner`);

    [...cartItemElements, ...cartDrawerItemElements].forEach((overlay) => overlay.classList.remove('hidden'));

    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading(line) {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.remove('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading__spinner`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading__spinner`);

    cartItemElements.forEach((overlay) => overlay.classList.add('hidden'));
    cartDrawerItemElements.forEach((overlay) => overlay.classList.add('hidden'));
  }
}

customElements.define('cart-items', CartItems);

if (!customElements.get('cart-note')) {
  customElements.define(
    'cart-note',
    class CartNote extends HTMLElement {
      constructor() {
        super();

        this.addEventListener(
          'input',
          debounce((event) => {
            const body = JSON.stringify({ note: event.target.value });
            fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } })
              .then(() => CartPerformance.measureFromEvent('note-update:user-action', event));
          }, ON_CHANGE_DEBOUNCE_TIMER)
        );
      }
    }
  );
}
