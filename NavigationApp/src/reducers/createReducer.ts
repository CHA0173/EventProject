const initialState = {
    info:{
        name: null,
        description: null,
        date: null,
        time: null,
        address: null,
        private: null,
        deposit: null,
        isactive: true
    }, 
    todolist:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_INFO':
            return {

            }

        case 'CREATE_TODO':
            return {

            }
    }
}