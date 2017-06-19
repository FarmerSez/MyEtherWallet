import { combineAndUpper } from 'api/bity';

export const SWAP_ORIGIN_KIND = 'SWAP_ORIGIN_KIND';
export const SWAP_DESTINATION_KIND = 'SWAP_DESTINATION_KIND';
export const SWAP_ORIGIN_AMOUNT = 'SWAP_ORIGIN_AMOUNT';
export const SWAP_DESTINATION_AMOUNT = 'SWAP_DESTINATION_AMOUNT';
export const SWAP_DESTINATION_KIND_OPTIONS = 'SWAP_DESTINATION_KIND_OPTIONS';
export const SWAP_UPDATE_BITY_RATES = 'SWAP_UPDATE_BITY_RATES';
export const ALL_CRYPTO_KIND_OPTIONS = ['BTC', 'ETH', 'REP'];

export const SWAP_ORIGIN_KIND_TO = value => {
  return {
    type: SWAP_ORIGIN_KIND,
    value
  };
};

export const SWAP_DESTINATION_KIND_TO = value => {
  return {
    type: SWAP_DESTINATION_KIND,
    value
  };
};

export const SWAP_DESTINATION_KIND_OPTIONS_TO = value => {
  return {
    type: SWAP_DESTINATION_KIND_OPTIONS,
    value
  };
};

export const SWAP_ORIGIN_AMOUNT_TO = value => {
  return {
    type: SWAP_ORIGIN_AMOUNT,
    value
  };
};

export const SWAP_DESTINATION_AMOUNT_TO = value => {
  return {
    type: SWAP_DESTINATION_AMOUNT,
    value
  };
};

export const SWAP_UPDATE_BITY_RATES_TO = value => {
  return {
    type: SWAP_UPDATE_BITY_RATES,
    value
  };
};

export function SWAP_THUNK_HANDLE_ORIGIN_COIN_CHANGE(newOriginKind, bityRates) {
  return (dispatch, getState) => {
    let destinationKind = newOriginKind === getState().swap.destinationKind
      ? ALL_CRYPTO_KIND_OPTIONS.filter(element => element !== newOriginKind)[0]
      : getState().swap.destinationKind;
    let destinationKindOptions = ALL_CRYPTO_KIND_OPTIONS.filter(
      element => element !== newOriginKind
    );

    let pairName = combineAndUpper(newOriginKind, destinationKind);
    let bityRate = bityRates[pairName];
    let newDestinationAmount = parseFloat(
      getState().swap.originAmount * bityRate
    );

    dispatch(SWAP_ORIGIN_KIND_TO(newOriginKind));
    dispatch(SWAP_DESTINATION_KIND_TO(destinationKind));
    dispatch(SWAP_DESTINATION_KIND_OPTIONS_TO(destinationKindOptions));
    dispatch(SWAP_DESTINATION_AMOUNT_TO(newDestinationAmount));
  };
}
