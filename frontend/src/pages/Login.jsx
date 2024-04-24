import { useEffect, useState } from "react"
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { login,reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Login() {
const [FormData, setFormData] = useState({
  email:'',
  password:''
})

const {email,password} = FormData
  
const navigate = useNavigate()
const dispatch = useDispatch()

const {user, isLoading, isError, isSuccess, message} = useSelector(
  (state)=> state.auth
)

useEffect(() =>{
  if(isError){
    toast.error(message)
  }

  if(isSuccess || user){
    navigate('/')
  }

  dispatch(reset())
}, [user, isError, isSuccess, message, navigate, dispatch])


const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
}
const onSubmit = (e)=>{
  e.preventDefault()

  const userData = {
    email,
    password
  }

  dispatch(login(userData))
}

if(isLoading){
  return <Spinner/>
}

return (
    <>
      <section className="container heading">
        <h1>
          <FaSignInAlt />Login
        </h1>
        <p>Please login to your account</p>
      </section>

      <section className="container  form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="email" className="form-control" id="email"
            name="email" value={email} placeholder="Enter email" onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password"
            name="password" value={password} placeholder="Enter password" onChange={onChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
