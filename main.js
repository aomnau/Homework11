const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<MyApp/>
)
function Counter({item : {id, number}, hdlUpdate, hdlDelCounter}){
    return(
        <div className='counter'>
            <button onClick={()=>hdlUpdate(id,-1)}>-</button>
            <h3>{number}</h3>
            <button onClick={()=>hdlUpdate(id,1)}>+</button>
            <button onClick={()=>hdlUpdate(id,-number)}>C</button>
            <button onClick={() => hdlDelCounter(id)}>X</button>
        </div>
    )
}

function SumInfo({sum}){
    return(
        <div className='suminfo'>
            <h1 style={{color: 'skyblue', fontSize: '30px'}}>Sum = {sum}</h1>
        </div>
    )
}

function MyApp(){
    const [counters, setCounters] = React.useState([{id: 1, number: 0}])
    
    const calculateSum = () => {
        return counters.reduce((sum, counter) => sum + counter.number, 0)
      }

    const hdlUpdate = (id, num) => {
        const cloneCounters = [...counters]
        let idx = cloneCounters.findIndex( (el) => el.id === id)
        if(cloneCounters[idx].number + num < 0) {
            return
        }
        console.log(idx, num)
        cloneCounters[idx].number += num
        setCounters(cloneCounters)
    }

    const hdlDelCounter = (id) => {
        const cloneCounters = counters.filter((counter) => counter.id !== id)
        setCounters(cloneCounters)
      }
      
    const hdlAddCounter = ()=>{
        let newId = counters.length === 0 ? 1 : counters.at(-1).id +1
        const cloneCounters = [...counters]
        cloneCounters.push({id: newId, number: 0})
        setCounters(cloneCounters)
    }
    return(
        <>
        <div className='text-center'>
        <h1>Codecamp Academy 01</h1>
        <button onClick={hdlAddCounter}>Add Counter</button>
        <SumInfo sum={calculateSum()} />
        {counters.map( (el) => {
            return (
            <Counter 
            key = {el.id} item={el} 
            hdlUpdate={hdlUpdate} 
            hdlDelCounter={hdlDelCounter} 
            />
            )
        })}
        </div>
        </>
    )
}