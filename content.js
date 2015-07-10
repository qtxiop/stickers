var window = window;

var stickers = {};

var Sticker = function(content, url, x, y)
{
	var sticker =
	{
		content: content,

		default:
		{
			height: 1,
			width: 1
		},

		height: 10,

		open: function(object)
		{
			object.style.height = this.height + 'em';
			object.style.width = this.width + 'em';
		},

		turn: function(object)
		{
			object.style.height = this.default.height + 'em';
			object.style.width = this.default.width + 'em';
		},

		url: url,

		width: 10,

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
			var box = window.document.createElement('div');
				box.className = 'sticker_box';
				box.draggable = true;
				box.style.left = sticker.x + 'px';
				box.style.top = sticker.y + 'px';
				box.style.zIndex = manager.zIndexMax + 1;

			var textarea = window.document.createElement('textarea');
				textarea.className = 'sticker';
				textarea.innerHTML = sticker.content;
				textarea.readOnly = true;

			box.ondragend = function()
			{
				sticker.x = event.x;
				sticker.y = event.y;

				box.removeChild(textarea);
				box.parentElement.removeChild(box);

				manager.show(sticker);
			};

			box.onmouseout = function()
			{
				sticker.turn(box);
				textarea.readOnly = true;
			};

			box.onmouseover = function()
			{
				sticker.open(box);
				textarea.readOnly = false;
			};

			textarea.onkeydown = function()
			{
				sticker.open(box);
				sticker.content = textarea.value;
			};

			window.document.body.appendChild(box);
			box.appendChild(textarea);
		};
	},

	get zIndexMax()
	{
		var elements = window.document.getElementsByTagName('*');
		var zIndex, zIndexMax = 0;
		for(var i = 0; i < elements.length; i++)
		{
			zIndex = window.document.defaultView.getComputedStyle(elements[i], null).getPropertyValue('z-index');
			if((zIndex > zIndexMax) && (zIndex != 'auto'))
			{
				zIndexMax = zIndex;
			};
		};
		return zIndexMax;
	}
};

window.onload = function()
{
	var s = Sticker('test', window.location.hostname + window.location.pathname, 100, 100);
	manager.show(s);
	window.console.log(manager.map(s) + ' & ' + manager.zIndexMax);
};