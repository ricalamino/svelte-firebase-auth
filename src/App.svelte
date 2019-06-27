<script>
  import Register from './Components/Auth/Register.svelte';
  import Dashboard from './Components/Dashboard.svelte';
  import { Router, Link, Route } from 'svelte-routing';
  import Login from './Components/Auth/Login.svelte';
	import { user } from './store.js';
  import { auth } from './firebase.js';

  const classActive = "active";
  const classInactive = "inactive";
  
	const handleLogOut = () => {
		auth.signOut().then(function() {
			// Sign-out successful.
			user.set({...$user, loggedIn: false});
			console.log('logout', $user);

		}, function(error) {
			// An error happened.
		});
	}

	function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: classActive };
    }
    return {class: classInactive };
  }
	
</script>

<Router>
    <ul>
        <li><Link to="/" getProps="{getProps}">Home</Link></li>
        {#if $user.loggedIn}
            <li><Link to="dashboard" getProps="{getProps}">Dashboard</Link></li>
            <li><a class="inactive" href="/" on:click={handleLogOut}>Logout</a></li>
        {:else}
            <li><Link to="login" getProps="{getProps}">Login</Link></li>
            <li><Link to="register" getProps="{getProps}">Register</Link></li>
        {/if}
    </ul>

    <Route path="login" component={Login} />
    <Route path="register" component={Register} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="/">
        <h1>HOME</h1>
        <p>To view the protected content, register or login to your account</p>
    </Route>
</Router>
