const sndBtn = document.getElementById('snd');
const email = document.getElementById('exampleInputEmail1');
const password = document.getElementById('exampleInputPassword1');

const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;

sndBtn.addEventListener('click', (e) => {
	e.preventDefault()

	const dataTrue = checked();
	// console.log(dataTrue)
	if (dataTrue) {
		data = {
			mail: email.value,
			password: password.value, 
		}

		console.log(data)
		
		const PushInfo =  request('/api/information', 'POST', data)
		console.log(PushInfo.body)
	}
});

async function request(url, method = 'GET', data = null) {
	try {
		const headers = {};
		let body;

		if (data) {
			headers['Content-Type'] = 'application/json';
			body = JSON.stringify(data);
		}
		console.log('req:', body);
		const response = await fetch(url, {
			method,
			headers,
			body
		})
		return await response;
	} catch (e) {
		console.warn(`Erorr: ${e.message}`);
	}
}
async function checked(){
    if (email.value=='')
    {
        email.reportValidity();
        email.setCustomValidity('Введите почту!');
        email.classList.add('red_border');
        return false;
    }else{
        email.classList.remove('red_border');
        email.classList.add('green_border');   
    }
    if(password.value=='')
    {
        password.reportValidity();
        password.setCustomValidity('Введите пароль!');   
        password.classList.add('red_border');
        return false;
    }else{
        password.classList.remove('red_border');
        password.classList.add('green_border');  
    }
   if (!cyrillicPattern.test(email.value)) {
        email.reportValidity();
        email.setCustomValidity('Введите буквы!');  
        email.classList.add('red_border');    
        return false;
    }else{
        email.classList.remove('red_border');
        email.classList.add('green_border');
    }
    return true;
}