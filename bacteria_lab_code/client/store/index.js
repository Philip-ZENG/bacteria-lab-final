import { legacy_createStore as createStore} from 'redux'

const selectedColonyReducer = (state = {selectedColonyID: 0, selectedNFTID: 0}, action) => {
  // Used to synchronize data between the colony clicked on the gameboard and the info shown in the tile info and action board
  if(action.type == "changeSelectedColony") {
    // console.log(state.selectedColonyID);
    // console.log(action.newSelectedColonyID);
    return {
      selectedColonyID: action.newSelectedColonyID
    }
  }
  // Used to synchronize data between the show nft board and the nft display board
  if(action.type == "changeSelectedNFT") {
    // console.log(state.selectedNFTID);
    // console.log(action.newSelectedNFTID);
    return {
      selectedNFTID: action.newSelectedNFTID
    }
  }
  return state;
}

const store = createStore(selectedColonyReducer);

export default store;