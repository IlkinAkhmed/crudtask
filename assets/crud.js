const inpname = document.querySelector("#inpName")
const inpquan = document.querySelector("#inpQuan")
const inpprice = document.querySelector("#inpPrice")
const tbody = document.querySelector("#tbody")
const btncreate = document.querySelector("#create")
const btnupdt = document.querySelector("#update")
const view = document.querySelector("#view")
const table = document.querySelector("#table")
const url = 'https://northwind.vercel.app/api/products'
view.onclick=()=>{
    table.classList.toggle('active')
}


async function fetchData() {
    try {
        const res = await axios(url)
        addTable(res.data)
    } catch (error) {
        console.log(error);
    }
}
function addTable(data) {
    tbody.innerHTML=''
    try {
        data.forEach(items => {
            const trow = document.createElement('tr')
            trow.innerHTML = `
            <td>${items.id}</td>
            <td>${items.name}</td>
            <td>${items.quantityPerUnit}</td>
            <td>${items.unitPrice} $</td>
            <td>
                <button onclick="editPost(${items.id})">edit</button>
                <button onclick="deletePost(${items.id})">delete</button>
            </td>
            `
            tbody.appendChild(trow)

        });

    } catch (error) {
        console.log(error);
    }
}
btncreate.addEventListener('click',  async e => {
    e.preventDefault()
    async function createElement() {
        try {
            await axios.post(url, {
                name: inpname.value,
                quantityPerUnit: inpquan.value,
                unitPrice: +inpprice.value
            })
            await fetchData()
        } catch (error) {
            console.log(error);
        }
    }
    await createElement()
})

editPostId = null
async function editPost(Id) {
    try {
        const res = await axios.get(`${url}/${Id}`)
        data = res.data
        inpname.value = data.name
        inpquan.value = data.quantityPerUnit
        inpprice.value = data.unitPrice
        editPostId=Id
    } catch (error) {
        console.log(error);
    }
}

btnupdt.addEventListener('click',async e =>{
    e.preventDefault()
    async function UpdatePost(){
        if (editPostId) {
            try {
                await axios.put(`${url}/${editPostId}`,{
                    name:inpname.value,
                    quantityPerUnit:inpquan.value,
                    unitPrice:inpprice.value
                })
                await fetchData()
            } catch (error) {
                console.log(error);
            }
        }
    }
    UpdatePost()
})
async function deletePost(Id) {
    try {
        await axios.delete(`${url}/${Id}`)
        await fetchData()
    } catch (error) {
        console.log(error);
    }
}
fetchData()