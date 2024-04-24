import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user:null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:'' 
}

// Register user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)        
        }
    }
)

// Login user
export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)        
        }
    }
)

export const editUser = createAsyncThunk(
    "auth/editUser",
    async ({ userId, name, email,mobile }, thunkAPI) => {
      try {
        console.log(thunkAPI.getState(), "token");
        const token = thunkAPI.getState().auth.user.token;
        return await authService.editUserDeatils(
          token,
          userId,
          name,
          email,
          mobile
        );
      } catch (error) {
        alert(error);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  export const userEdit = createAsyncThunk(
    "auth/userEdit",
    async ({ userId, name, email, image,mobile }, thunkAPI) => {
      try {
        console.log(thunkAPI.getState(), "token");
        const token = thunkAPI.getState().auth.user.token;
        return await authService.usereditDeatils(
          token,
          userId,
          name,
          email,
          mobile,
          image
        );
      } catch (error) {
        alert(error);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
export const logout = createAsyncThunk('auth/logout',
    async ()=>{
        await authService.logout()
    }
)

const addProduct = createAsyncThunk('auth/addProduct',
async ()=>{
  await authService.add()
}
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=false  
            state.message=''
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(register.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload

        })
        .addCase(register.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(login.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload

        })
        .addCase(login.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(editUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(editUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.update = true;
            state.user = action.payload;
        })
        .addCase(editUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(userEdit.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(userEdit.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.update = true;
            state.user = action.payload;
          })
          .addCase(userEdit.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
        .addCase(logout.fulfilled,(state)=>{
            state.user = null
        })
    }
})


export const {reset} = authSlice.actions
export default authSlice.reducer 