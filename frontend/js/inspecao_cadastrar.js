const res = document.getElementById('res')
const btn_cad = document.getElementById('btn_cad')

btn_cad.addEventListener('click',(e)=>{
    e.preventDefault()

    const status = document.getElementById('status').value
    const data = document.getElementById('data').value
    const idEquipamento = document.getElementById('idEquipamento').value

    const valores = {
        status: status,
        data: data,
        idEquipamento: idEquipamento
    }

    fetch('http://localhost:3000/inspecao',{
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
        res.innerHTML = 'Erro ao tentar cadastrar inspeção!'
        console.error('Erro ao tentar cadastrar inspeção!',err)
    })
})