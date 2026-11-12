const res = document.getElementById('res')
const btn_cad = document.getElementById('btn_cad')

btn_cad.addEventListener('click',(e)=>{
    e.preventDefault()

    const modelo = document.getElementById('modelo').value
    const fabricante = document.getElementById('fabricante').value
    const numSerie = document.getElementById('numSerie').value
    const idCliente = Number(document.getElementById('idCliente').value)

    const valores = {
        modelo: modelo,
        fabricante: fabricante,
        numSerie: numSerie,
        idCliente: idCliente
    }

    fetch('http://localhost:3000/equipamento',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados=>{
        res.innerHTML = ''
        res.innerHTML += `${dados.message}`
    })
    .catch((err)=>{
        res.innerHTML = 'Erro ao tentar cadastrar equipamento!'
        console.error('Erro ao tentar cadastrar equipamento!',err)
    })
})