const weatherForm=document.querySelector('form')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    document.querySelector("#message").textContent="Loading..."
    const address=document.querySelector('input').value;
    fetch('/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                document.querySelector("#message").textContent=data.error;
                document.querySelector("#location").textContent="";
            } else{
                document.querySelector("#message").textContent=data.forecastData;
                document.querySelector("#location").textContent=data.address;
            }
        })
    })
})