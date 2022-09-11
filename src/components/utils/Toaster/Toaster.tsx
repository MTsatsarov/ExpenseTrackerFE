import { Alert,Snackbar,AlertTitle } from "@mui/material"
import { render } from "@testing-library/react";
import { Component } from "react";

interface ToasterProps {
	isOpen:boolean,
	title:string,
	severity:any,
	message:string
}

class Toaster extends Component <ToasterProps>{

	constructor(props:ToasterProps) {
		super(props)
		this.state = {

		}
	}

	static show(severity:any,title:string,message:string) {
		return render(
			<Toaster isOpen={ true } title={ title } severity={ severity } message={ message } />,
		);
	}

	componentDidMount() {
		setTimeout(this.closePopUp.bind(this),6000)
	};

	closePopUp = () => {
		var wrapper = document.getElementById('wrapper');
		wrapper?.remove();
	}

	render() {

		return (
				<Snackbar id="wrapper"
					open={ this.props.isOpen }
					anchorOrigin={ { horizontal: 'right',vertical: 'top' } }>
					<Alert
						severity={ this.props.severity }
						variant='filled'
						onClose={ this.closePopUp.bind(this) }>
						{
							this.props.title &&
							<AlertTitle>{ this.props.title }</AlertTitle>
						}
						{
							this.props.message
						}
					</Alert>
				</Snackbar >
		)
	}

}

export default Toaster