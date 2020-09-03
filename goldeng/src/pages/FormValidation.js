function validateForm(event, state) {
  const inputs = document.getElementsByClassName("isdanger")
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].classList.contains("error")) {
      inputs[i].classList.remove("isdanger")
    }
  }
  
  if (state.hasOwnProperty("username") && state.username === "") {
    document.getElementById("username").classList.add("text-danger")
    return { blankfield: true }
  }
  if (state.hasOwnProperty("email") && state.email === "") {
    document.getElementById("email").classList.add("text-danger")
    return { blankfield: true }
  }
  if (state.hasOwnProperty("code") && state.code === ""){
    document.getElementById("code").classList.add("text-danger")
    return { blankfield: true }
  }
  if (state.hasOwnProperty("password") && state.password === "") {
    document.getElementById("password").classList.add("text-danger")
    return { blankfield: true }
  }
  return
}
  
export default validateForm