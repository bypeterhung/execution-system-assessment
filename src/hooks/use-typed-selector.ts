import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { StoreRootState } from 'services/store/store-config'

/**
 * implementation of the redux useSelector hook
 */
const useTypedSelector: TypedUseSelectorHook<StoreRootState> = useSelector

export default useTypedSelector
