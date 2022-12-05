//css
import './App.css'
import './view/css/action.css'
import './view/css/camera.css'
import './view/css/chat.css'
import './view/css/intro.css'
import './view/css/info.css'
import './view/css/input.css'
import './view/css/loader.css'
import './view/css/main.css'

import { useRoutes } from "react-router-dom";

import Intro from './controller/Intro/Intro';
import {Main}  from './controller/Main/Main'

const AppRoutes = () => {
	const appName = process.env.REACT_APP_NAME
	const robotName = process.env.REACT_APP_ROBOT_NAME

  	let routes = useRoutes([
  	  	{ path: "/"    , element: <Intro robotName={robotName} appName={appName} apiTarget={"IntroGUI"} request={{}}/> },
  	  	{ path: "/main", element: <Main  robotName={robotName} appName={appName} /> },
  	])
  	return routes;
}

const App = () => {
  	return (
  	    <AppRoutes />
  	)
}

export default App;
