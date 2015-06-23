var window = window;

var stickers = {};

var Sticker = function(content, url, x, y)
{
	var sticker =
	{
		content: content,
		url: url,
		x: x,
		y: y
	};
	return sticker;
};

var manager =
{
	map: function(sticker)
	{
		var domens = [];
		var paths = [];
		var length = 0;
		for(var i = sticker.url.length; i > 0; i--)
		{
			length++;
			if(sticker.url.substr(i, 1) == '/')
			{
				var path = sticker.url.substr(i + 1, length - 1);
				if(path != '')
				{
					paths[paths.length] = path;
				};
				length = 0;
			};
			if(sticker.url.substr(i, 1) == '.')
			{
				domens[domens.length] = sticker.url.substr(i + 1, length - 1);
				length = 0;
			};
		};
		domens = domens.concat(sticker.url.substr(0, length + 1));
		return domens.concat(paths.reverse());
	},
	save: function(sticker)
	{

	},
	show: function(sticker)
	{
		if((window.location.hostname + window.location.pathname) == sticker.url)
		{
			var textarea = window.document.createElement('textarea');
				textarea.className = 'sticker';
				textarea.innerHTML = window.location.hostname + window.location.pathname;// sticker.content;
				textarea.style.left = sticker.x + 'px';
				textarea.style.top = sticker.y + 'px';
			window.document.body.appendChild(textarea);
		};
	}
};

window.onload = function()
{
	var s = Sticker('test', window.location.hostname + window.location.pathname, 100, 100);
	manager.show(s);
	window.console.log(manager.map(s));
};