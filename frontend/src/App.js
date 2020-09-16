import React from 'react';


function App() {

  const [data, setData] = React.useState([])

  // const formatter = new Intl.NumberFormat("en-GB", {
  //   style: "currency",
  //   currency: "gbp",
  // })

  React.useEffect(() => {
    let eventSource = new EventSource("http://localhost:5000/readMessage")
    eventSource.onmessage = e => console.log(JSON.parse(e.data))
    // eventSource.onmessage = e => updateProdutList(JSON.parse(e.data))
  }, [])

  const updateProdutList = (product) => {
    console.log(product);
    setData([...product])
  }

  return (
    <>
    </>
  )
}

export default App;
