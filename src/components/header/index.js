import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<h1>Fair Roller</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Setup</Link>
			<Link activeClassName={style.active} href="/game">Roll</Link>
			<Link activeClassName={style.active} href="/stats">Outcomes</Link>
		</nav>
	</header>
);

export default Header;
