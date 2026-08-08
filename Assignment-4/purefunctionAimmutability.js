const cart = {
    items: [
        { id: 1, name: "Pizza", quantity: 2, price: 250 },
        { id: 2, name: "Burger", quantity: 1, price: 150 }
    ]
};

// Add item
function addItem(cart, item) {
    return {
        ...cart,
        items: [...cart.items, item]
    };
}

// Remove item
function removeItem(cart, itemId) {
    return {
        ...cart,
        items: cart.items.filter(item => item.id !== itemId)
    };
}

// Update quantity
function updateQuantity(cart, itemId, quantity) {
    return {
        ...cart,
        items: cart.items.map(item =>
            item.id === itemId
                ? { ...item, quantity: quantity }
                : item
        )
    };
}

// New Cart
const newCart = addItem(cart, {
    id: 3,
    name: "Biryani",
    quantity: 1,
    price: 200
});

console.log("Original Cart:", cart);
console.log("New Cart:", newCart);

const updatedCart = updateQuantity(newCart, 1, 5);
console.log("Updated Cart:", updatedCart);

const removedCart = removeItem(updatedCart, 2);
console.log("After Removing Burger:", removedCart);


/*output:
Original Cart: {
  items: [
    { id: 1, name: 'Pizza', quantity: 2, price: 250 },
    { id: 2, name: 'Burger', quantity: 1, price: 150 }
  ]
}
New Cart: {
  items: [
    { id: 1, name: 'Pizza', quantity: 2, price: 250 },
    { id: 2, name: 'Burger', quantity: 1, price: 150 },
    { id: 3, name: 'Biryani', quantity: 1, price: 200 }
  ]
}
Updated Cart: {
  items: [
    { id: 1, name: 'Pizza', quantity: 5, price: 250 },
    { id: 2, name: 'Burger', quantity: 1, price: 150 },
    { id: 3, name: 'Biryani', quantity: 1, price: 200 }
  ]
}
After Removing Burger: {
  items: [
    { id: 1, name: 'Pizza', quantity: 5, price: 250 },
    { id: 3, name: 'Biryani', quantity: 1, price: 200 }
  ]
}
*/
