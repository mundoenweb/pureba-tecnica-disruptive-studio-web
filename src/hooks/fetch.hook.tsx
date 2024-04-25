interface paramsFetch {
  path: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: Record<string, any>
  alerts?: boolean
  customErrorFatal?: string
}

export const useFetch = async <t extends Record<string, any>>({
  path,
  data,
  method = 'GET',
  alerts = true,
  customErrorFatal,
}: paramsFetch): Promise<t> => {
  const token = window.localStorage.getItem('token') ?? ''

  return await fetch(`${process.env.NEXT_PUBLIC_URL_API!}${path}`, {
    method,
    headers: { authorization: `Bearer ${token}` },
    ...(data !== undefined && {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),
  })
    .then(async (response) => await response.json())
    .then(({ status, errors, message, data }) => {
      if (errors && status === 400) {
        if (alerts) alert(errors[0])
        else console.log(errors[0])
        return
      }
      if (message && status >= 400) {
        if (alerts) alert(message)
        else console.log(message)
        return
      }
      return data
    })
    .catch((err) => {
      console.log(customErrorFatal ?? err.message)
      alert(customErrorFatal ?? 'Error de comunicación con el servidor')
    })
}
