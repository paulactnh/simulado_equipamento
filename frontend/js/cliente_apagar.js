const res = document.getElementById('res')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const id = Number(document.getElementById('id').value)


    fetch(`http://localhost:3000/cliente/${id}`,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(dados=>{
        res.innerHTML = ''
        res.innerHTML += `${dados.message}`
    })
    .catch((err)=>{
        res.innerHTML = 'Erro ao tentar consultar cliente!'
        console.error('Erro ao tentar consultar cliente!',err)
    })
})