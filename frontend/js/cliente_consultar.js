const res = document.getElementById('res')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const id = Number(document.getElementById('id').value)


    fetch(`http://localhost:3000/cliente/${id}`)
    .then(res => res.json())
    .then(dados=>{
        res.innerHTML = ''
        res.innerHTML += `
        <table>
            <thead>
                <tr>
                <th>Nome</th>
                <th>CPF</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${dados.nome}</td>
                    <td>${dados.cpf}</td>
                </tr>
            </tbody>
        </table>`
    })
    .catch((err)=>{
        res.innerHTML = 'Erro ao tentar consultar cliente!'
        console.error('Erro ao tentar consultar cliente!',err)
    })
})