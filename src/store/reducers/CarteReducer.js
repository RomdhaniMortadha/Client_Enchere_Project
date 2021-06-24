import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  totalAmount: 0,
  totalPoint:0
};

const AddItems = (state, action) => {
  const updatedTotalAmount =
    state.totalAmount + action.item.price * action.item.amount;
    const updatedTotalPoint =
    state.totalPoint + (action.item.packof*action.item.amount) ;
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.item.id
  );
  const existingCartItem = state.items[existingCartItemIndex];
  let updatedItems;

  if (existingCartItem) {
    console.log(existingCartItem.amount);
    const updatedItem = {
      ...existingCartItem,
      amount: Number(existingCartItem.amount) + Number(action.item.amount),
      totalpoint:  existingCartItem.packof*(Number(existingCartItem.amount) + Number(action.item.amount))
    };
    updatedItems = [...state.items];
    updatedItems[existingCartItemIndex] = updatedItem;
  } else {
    updatedItems = state.items.concat(action.item);
  }
  
  console.log(updatedItems);
  return {
    items: updatedItems,
    totalAmount: updatedTotalAmount,
    totalPoint:updatedTotalPoint
  };
};

const removeitems = (state, action) => {
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.id
  );
 
  const existingItem = state.items[existingCartItemIndex];
  console.log(existingItem)
  const updatedTotalAmount = state.totalAmount - existingItem.price;
  const updateTotalPoint=state.totalPoint-existingItem.packof
  let updatedItems;
  if (existingItem.amount === 1) {
    updatedItems = state.items.filter((item) => item.id !== action.id);
  } else {
    const updatedItem = { ...existingItem, amount: existingItem.amount - 1 ,totalpoint:existingItem.totalpoint-existingItem.packof};
    updatedItems = [...state.items];
    updatedItems[existingCartItemIndex] = updatedItem;
  }

  return {
    items: updatedItems,
    totalAmount: updatedTotalAmount,
    totalPoint:updateTotalPoint
  };
};


const Clearitems=(state,action) =>{
  return {
    items: [],
    totalAmount: 0,
    totalPoint:0
  };
}

const CarteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEMS_TOCART:
      return AddItems(state, action);
    case actionTypes.Remove_ITEM_FROMCART:
      return removeitems(state, action);
    case actionTypes.CLEAR_ITEAM:
      return Clearitems(state,action);
    default:
      return state;
  }
};

export default CarteReducer;
