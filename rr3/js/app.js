var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler
	, Route = Router.Route
	, DefaultRoute = Router.DefaultRoute
	, Link = Router.Link;
var $ = require('jquery');

var One = React.createClass({

	gotoLink: function(id, event) {
		console.log(id);
		
		var content1 = React.findDOMNode(this.refs.content1);
		//$("#link1").scrollToTop();
		console.log($(content1).find('#'+ id));
		console.log($(content1).offset().top);
		console.log('test3');
		$('html, body').scrollTop($(content1).find("#"+id).offset().top);
		//$(window).scrollToTop($(content1).find("#"+id).offset.top());
	}

,	render: function() {
		var topStyle = {width: '100%', height: '100%'};
		var innerStyle1 = {position: 'relative', width: '25%', float: 'left'};
		var innerStyle2 = {position: 'relative', width: '25%', float: 'left'};
		var buttonStyle = {float: 'left'}
		return (
			<div style={topStyle}>
				<div style={innerStyle1}>
					I am one - A1
						<button style={buttonStyle} onClick={this.gotoLink.bind(this, 'link1')}>Link1</button>
						<button style={buttonStyle} onClick={this.gotoLink.bind(this, 'link2')}>Link2</button>
						<button style={buttonStyle} onClick={this.gotoLink.bind(this, 'link3')}>Link3</button>
						<button style={buttonStyle} onClick={this.gotoLink.bind(this, 'link4')}>Link4</button>
						<button style={buttonStyle} onClick={this.gotoLink.bind(this, 'link5')}>Link5</button>
				</div>

				<div ref="content1" id="content1" style={innerStyle2}>
					<div id="link1">
					Link1 : An indefinite article indicates that its noun is not a particular one (or ones) identifiable to the listener. It may be something that the speaker is mentioning for the first time, or its precise identity may be irrelevant or hypothetical, or the speaker may be making a general statement about any such thing. English uses a/an, from the Old English forms of the number 'one', as its primary indefinite article. The form an is used before words that begin with a vowel sound (even if spelled with an initial consonant, as in an hour), and a before words that begin with a consonant sound (even if spelled with a vowel, as in a European).
She had a house so large that an elephant would get lost without a map.
Before some words beginning with a pronounced (not silent) h in an unstressed first syllable, such as hallucination, hilarious, historic(al), horrendous, and horrific, some (especially older) British writers prefer to use an over a (an historical event, etc.).[5] An is also preferred before hotel by some writers of British English (probably reflecting the relatively recent adoption of the word from French, where the h is not pronounced).[6] The use of "an" before words beginning with an unstressed "h" is more common generally in British English than American.[6] American writers normally use a in all these cases, although there are occasional uses of an historic(al) in American English.[7] According to the New Oxford Dictionary of English, such use is increasingly rare in British English too.[5] Unlike British English, American English typically uses an before herb, since the h in this word is silent for most Americans. The correct usage in respect of the term "hereditary peer" was the subject of an amendment debated in the UK Parliament.[8]
					</div>
					<div id="link2">
					Link2 : An indefinite article indicates that its noun is not a particular one (or ones) identifiable to the listener. It may be something that the speaker is mentioning for the first time, or its precise identity may be irrelevant or hypothetical, or the speaker may be making a general statement about any such thing. English uses a/an, from the Old English forms of the number 'one', as its primary indefinite article. The form an is used before words that begin with a vowel sound (even if spelled with an initial consonant, as in an hour), and a before words that begin with a consonant sound (even if spelled with a vowel, as in a European).
She had a house so large that an elephant would get lost without a map.
Before some words beginning with a pronounced (not silent) h in an unstressed first syllable, such as hallucination, hilarious, historic(al), horrendous, and horrific, some (especially older) British writers prefer to use an over a (an historical event, etc.).[5] An is also preferred before hotel by some writers of British English (probably reflecting the relatively recent adoption of the word from French, where the h is not pronounced).[6] The use of "an" before words beginning with an unstressed "h" is more common generally in British English than American.[6] American writers normally use a in all these cases, although there are occasional uses of an historic(al) in American English.[7] According to the New Oxford Dictionary of English, such use is increasingly rare in British English too.[5] Unlike British English, American English typically uses an before herb, since the h in this word is silent for most Americans. The correct usage in respect of the term "hereditary peer" was the subject of an amendment debated in the UK Parliament.[8]
					</div>
					<div id="link3">
					Link3 : An indefinite article indicates that its noun is not a particular one (or ones) identifiable to the listener. It may be something that the speaker is mentioning for the first time, or its precise identity may be irrelevant or hypothetical, or the speaker may be making a general statement about any such thing. English uses a/an, from the Old English forms of the number 'one', as its primary indefinite article. The form an is used before words that begin with a vowel sound (even if spelled with an initial consonant, as in an hour), and a before words that begin with a consonant sound (even if spelled with a vowel, as in a European).
She had a house so large that an elephant would get lost without a map.
Before some words beginning with a pronounced (not silent) h in an unstressed first syllable, such as hallucination, hilarious, historic(al), horrendous, and horrific, some (especially older) British writers prefer to use an over a (an historical event, etc.).[5] An is also preferred before hotel by some writers of British English (probably reflecting the relatively recent adoption of the word from French, where the h is not pronounced).[6] The use of "an" before words beginning with an unstressed "h" is more common generally in British English than American.[6] American writers normally use a in all these cases, although there are occasional uses of an historic(al) in American English.[7] According to the New Oxford Dictionary of English, such use is increasingly rare in British English too.[5] Unlike British English, American English typically uses an before herb, since the h in this word is silent for most Americans. The correct usage in respect of the term "hereditary peer" was the subject of an amendment debated in the UK Parliament.[8]
					</div>
					<div id="link4">
					Link4 : An indefinite article indicates that its noun is not a particular one (or ones) identifiable to the listener. It may be something that the speaker is mentioning for the first time, or its precise identity may be irrelevant or hypothetical, or the speaker may be making a general statement about any such thing. English uses a/an, from the Old English forms of the number 'one', as its primary indefinite article. The form an is used before words that begin with a vowel sound (even if spelled with an initial consonant, as in an hour), and a before words that begin with a consonant sound (even if spelled with a vowel, as in a European).
She had a house so large that an elephant would get lost without a map.
Before some words beginning with a pronounced (not silent) h in an unstressed first syllable, such as hallucination, hilarious, historic(al), horrendous, and horrific, some (especially older) British writers prefer to use an over a (an historical event, etc.).[5] An is also preferred before hotel by some writers of British English (probably reflecting the relatively recent adoption of the word from French, where the h is not pronounced).[6] The use of "an" before words beginning with an unstressed "h" is more common generally in British English than American.[6] American writers normally use a in all these cases, although there are occasional uses of an historic(al) in American English.[7] According to the New Oxford Dictionary of English, such use is increasingly rare in British English too.[5] Unlike British English, American English typically uses an before herb, since the h in this word is silent for most Americans. The correct usage in respect of the term "hereditary peer" was the subject of an amendment debated in the UK Parliament.[8]
					</div>
					<div id="link5">
					Link5 : An indefinite article indicates that its noun is not a particular one (or ones) identifiable to the listener. It may be something that the speaker is mentioning for the first time, or its precise identity may be irrelevant or hypothetical, or the speaker may be making a general statement about any such thing. English uses a/an, from the Old English forms of the number 'one', as its primary indefinite article. The form an is used before words that begin with a vowel sound (even if spelled with an initial consonant, as in an hour), and a before words that begin with a consonant sound (even if spelled with a vowel, as in a European).
She had a house so large that an elephant would get lost without a map.
Before some words beginning with a pronounced (not silent) h in an unstressed first syllable, such as hallucination, hilarious, historic(al), horrendous, and horrific, some (especially older) British writers prefer to use an over a (an historical event, etc.).[5] An is also preferred before hotel by some writers of British English (probably reflecting the relatively recent adoption of the word from French, where the h is not pronounced).[6] The use of "an" before words beginning with an unstressed "h" is more common generally in British English than American.[6] American writers normally use a in all these cases, although there are occasional uses of an historic(al) in American English.[7] According to the New Oxford Dictionary of English, such use is increasingly rare in British English too.[5] Unlike British English, American English typically uses an before herb, since the h in this word is silent for most Americans. The correct usage in respect of the term "hereditary peer" was the subject of an amendment debated in the UK Parliament.[8]
					</div>
				</div>
			</div>
		);
	}

});

var Two = React.createClass({

	render: function() {
		return (
			<div>He is Two</div>
		);
	}

});

var Three = React.createClass({

	render: function() {
		return (
			<div>He is Three</div>
		);
	}

});

var Custom = React.createClass({

	contextTypes: {
		router: React.PropTypes.func
	},

	render: function() {
		var customID = this.context.router.getCurrentParams().customID;
		return (
			<div>Here is the Custom {customID}</div>
		);
	}

});

var Zero = React.createClass({

	render: function() {
		return (
			<div>Nothing Nothing Dhach</div>
		);
	}

});

var App = React.createClass({

	render: function() {

		return (
			<div>
				<ul>
					<Link to="1">One</Link>
					<Link to="two">Two</Link>
					<Link to="three">Three</Link>
					<Link to="custom" params={{customID: 101}}>Custome 101</Link>
					<Link to="custom" params={{customID: 007}}>Custome 007</Link>
				</ul>

				<RouteHandler/>
			</div>
		);
	}

});

var routes = (
	<Route handler={App}>
		<DefaultRoute handler={Zero}/>
		<Route name="1" path="1" handler={One}/>
		<Route name="two" path="2" handler={Two}/>
		<Route name="three" path="3" handler={Three}/>
		<Route name="custom" path="t/:customID" handler={Custom}/>
	</Route>
);

Router.run(routes, function(Handler) {
	React.render(<Handler/>, document.getElementById("app"));
});



						// <button style={buttonStyle}>Link1</button>
						// <button style={buttonStyle} onClick={this.gotoLink('link2')}>Link2</button>
						// <button style={buttonStyle} onClick={this.gotoLink('link3')}>Link3</button>
						// <button style={buttonStyle} onClick={this.gotoLink('link4')}>Link4</button>
						// <button style={buttonStyle} onClick={this.gotoLink('link5')}>Link5</button>