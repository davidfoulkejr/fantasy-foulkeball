<script>
	import { page } from '$app/state';

	let { children } = $props();
</script>

<header>
	<div class="nav-container">
		<h1>Fantasy Foulkeball</h1>
		<nav>
			<ul class="nav__list">
				<li><a class="nav__list__item {page.url.pathname === "/" && "current"}" href="/"><span>Home</span></a></li>
				<li><a class="nav__list__item {page.url.pathname.startsWith("/schedule") && "current"}" href="/schedule"><span>Schedule</span></a></li>
				<li><a class="nav__list__item {page.url.pathname === "/teams" && "current"}" href="/teams"><span>Teams</span></a></li>
			</ul>
		</nav>
	</div>
</header>
<div class="app">
	<div class="app__content">
		<div class="app__content__inner">
			{@render children()}
		</div>
	</div>
</div>

<style>
	header {
		display: flex;
		height: 60px;
		justify-content: center;
		align-items: center;
		background-color: navy;
	}
	.nav-container {
		color: white;
		padding: 0 20px;
		width: 100%;
		height: 100%;
		max-width: 1200px;
		display: flex;
		align-items: center;
		gap: 40px;
		> h1 {
			font-size: 1.5rem;
			line-height: 0;
			margin: 0;
			padding: 0;
		}
		> nav {
			height: 100%;
		}
	}

	.nav__list {
		display: flex;
		gap: 10px;
		list-style: none;
		padding: 0;
		margin: 0;
		height: 100%;
	}

	.nav__list__item {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: white;
		height: 100%;
		padding: 0 10px;
		&:hover {
			background-color: #0056b3;
		}
		&.current {
			background-color: black;
		}
	}

	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.app__content {
		max-width: 900px;
		padding: 20px;
		box-sizing: border-box;
		background-color: white;
		height: 100%;
		min-height: calc(100vh - 60px);
		width: 100%;
	}

	.app__content__inner {
		width: 100%;
	}
</style>
