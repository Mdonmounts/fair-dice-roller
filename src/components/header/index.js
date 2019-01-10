import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<h1>Balanced Roller</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Play</Link>
			<Link activeClassName={style.active} href="/setup">Setup</Link>
		</nav>
	</header>
);

export default Header;
