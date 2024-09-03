	export function getElCountsAndLayout(clas) {
		let elements = {
			// flex左右布局中，给本身没有宽度属性的元素父级添加flex:1
			clas: clas.indexOf('circle') > -1 || clas.indexOf('square') > -1 ? '' : 'ls_flex-sub',
			eles: []
		};
		if (clas.indexOf('*') > -1) {
			let group = clas.split("*");
			for (let i = 0, len = Number.parseInt(group[1]); i < len; i++) {
				elements.eles.push({
					clas: 'ls_' + group[0],
					type: 'skeleton',
					// flex左右布局中，为了保持元素垂直居中，每一列的最后一行去掉margin-bottom
					// styl: i == len - 1 ? {marginBottom: '0'} : ''
				});
			}
		} else {
			elements.eles.push({
				clas: 'ls_' + clas,
				type: 'skeleton'
			});
		}
		return elements;
	}
	
	export function getElCounts(clas) {
		let elements = [];
		const modularName = [
			'line',
			'line-title',
			'line-title-center',
			'line-desc-center',
			'line-sm',
			'line-lg',
			'card',
			'card-sm',
			'card-lg',
			'circle',
			'circle-sm',
			'circle-lg',
			'square',
			'square-sm',
			'square-lg',
			'square-center'
		];
		if (clas.indexOf('*') > -1) {
			let group = clas.split("*");
			for (let i = 0, len = Number.parseInt(group[1]); i < len; i++) {
				elements.push({
					clas: 'ls_' + group[0],
					type: 'skeleton'
				});
			}
		} else if (modularName.includes(clas)) {
			elements.push({
				clas: 'ls_' + clas,
				type: 'skeleton'
			});
		} else {
			elements.push({
				clas: '',
				type: clas
			});
		}
		return elements;
	}