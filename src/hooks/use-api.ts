import { useEffect, useState } from 'react'

export type ApiPayload = { [key: string]: any } | undefined

export type ApiResult = {
   data: any
   loading: boolean
   error?: Error
}

const useApi = (
   apiFunc: (payload: any) => Promise<any>,
   initialPayload?: ApiPayload,
   defaultResultState: ApiResult = {
      data: undefined,
      loading: false,
      error: undefined,
   },
) => {
   const [apiResult, setApiResult] = useState<ApiResult>(defaultResultState)
   const [apiPayload, setApiPayload] = useState<ApiPayload>(
      initialPayload && { ...initialPayload },
   )

   useEffect(() => {
      if (apiPayload !== undefined) {
         setApiResult((prevState) => ({ ...prevState, loading: true }))
         apiFunc(apiPayload)
            .then((response) =>
               setApiResult({
                  data: response,
                  loading: false,
                  error: undefined,
               }),
            )
            .catch((ex) =>
               setApiResult({
                  data: undefined,
                  loading: false,
                  error: ex,
               }),
            )
      } else {
         setApiResult(defaultResultState)
      }
   }, [apiPayload])

   return [apiResult, setApiPayload] as const
}
export default useApi
