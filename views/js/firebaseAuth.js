function checkIfLoggedIn(){
	firebase.auth().onAuthStateChanged(function(user){
		if(user)
		{
			document.getElementById('google-signin')
				.setAttribute('style', 'display: none; visibility: hidden;')
			document.getElementById('signout')
				.setAttribute('style', 'display: inline-block; visibility: visible;')
		}else {
			document.getElementById('google-signin')
				.setAttribute('style', 'display: inline-block; visibility: visible')
			document.getElementById('signout')
				.setAttribute('style', 'display: none; visibility: hidden')
		}
	})
	.catch(function(error){
		console.log(error)
	})
	var user = firebase.auth().currentUser
	console.log(user)
					// if(user){
					// 	document.getElementById('google-signin')
					// 	.setAttribute('style', 'display: none; visibility: hidden;')
					// 	document.getElementById('signout')
					// 	.setAttribute('style', 'display: inline-block; visibility: visible;')
					// }
					// else{
					// 	document.getElementById('google-signin')
					// 	.setAttribute('style', 'display: inline-block; visibility: visible')
					// 	document.getElementById('signout')
					// 	.setAttribute('style', 'display: none; visibility: hidden')
					// }
				//}
				window.onload = function(){ 
				checkIfLoggedIn()
			}
				function signOut(){
					firebase.auth().signOut()
					
					document.getElementById('google-pic')
					.setAttribute('src', '')

					checkIfLoggedIn()
				}
				function signInWithGoogle(){
				var googleAuthProvider= new firebase.auth.GoogleAuthProvider

				firebase.auth().signInWithPopup(googleAuthProvider)
				.then(function(data){
					console.log(data);
					// var myName = data.user.displayName
					var photoURL = data.user.photoURL
					// document.getElementById('google-pic')
					// 	.setAttribute('src', photoURL)
					// document.getElementById('google-displayName')
					// 	.innerHTML = myName

					var idToken = data.credential.idToken
										
					document.getElementById('google-pic')
							.setAttribute('src', photoURL)
					// document.getElementById('google-displayName')
					// .innerHTML = myName
					// document.getElementById('gone')
					// 		.setAttribute('style', 'display: none; visibility: hidden;')
					checkIfLoggedIn()
				})
				.catch( function(error){
					console.log(error);
				})
			} 
		}