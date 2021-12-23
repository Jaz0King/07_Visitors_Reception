let data = [];

const db = firebase.firestore();

const getData = () => db.collection('visitors').get(); 

window.addEventListener('DOMContentLoader', async (e) => {
    const traer = await getData();
    traer.forEach((doc) => {
        dataAdmin.push(doc.data());
    });
    
    const ordenar = data.slice((a, b) => {
        
    })



});

