import React from "react";
// Components
// Images

//Components for Footer
export const FooterIcon = (props) => {
	return (
		<a href={props.to} rel="noopener noreferrer" target="_blank">
			<img
				src={props.icon}
				alt={props.alt}
				className="mx-2"
				style={{ width: "2.0rem", height: "2.50rem" }}
			/>{" "}
		</a>
	);
};

//Components for Main.jsx
export const InfoCard = (props) => {
	return (
		<div className="col-12 col-md-4 mx-auto">
			<div className="card h-100">
				<img src={props.icon} alt={props.alt} className="card-img-top p-3" style={{ height: "10rem" }} />
				<div className="card-body">
					<h5 className="card-title text-center">{props.title}</h5>
					<p className="card-text text-center">{props.description}</p>
				</div>
			</div>
		</div>
	);
};

export const AccordianItem = (props) => {
	return (
		<div className="accordion-item">
			<h2 className="accordion-header" id={"flush-heading" + props.number}>
				<button
					className="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target={"#flush-collapse" + props.number}
					aria-expanded="false"
					aria-controls={"flush-collapse" + props.number}
				>
					{props.title}
				</button>
			</h2>
			<div
				id={"flush-collapse" + props.number}
				className="accordion-collapse collapse"
				aria-labelledby={"flush-heading" + props.number}
				data-bs-parent={"#" + props.id}
			>
				<div className="accordion-body">{props.body}</div>
			</div>
		</div>
	);
};



