const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const counterReducer = (oldstate = initialState, action) => {
    console.log(action)
    const newstate = Object.assign({}, oldstate)
    switch (action.type) {
        case 'GOOD':
            newstate.good += 1
            break
        case 'OK':
            newstate.ok += 1
            break
        case 'BAD':
            newstate.bad += 1
            break
        case 'ZERO':
            return Object.assign({}, initialState)
            break
    }
    return newstate
}

export default counterReducer
