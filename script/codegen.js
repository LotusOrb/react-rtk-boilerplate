const vorpals = require('vorpal');
const fs = require('fs/promises');
const path = require('path');
const ejs = require('ejs')
const voca = require('voca')
let vorpal = new vorpals()

// Feature
vorpal
	.command('feature', 'Generate Feature by name')
	.action(async function (args, callback) {

		let fName = await this.prompt({
			type: 'input',
			name: 'name',
			message: 'Feature Name : '
		})

		const featureName = voca.camelCase(fName.name).split(' ').join('')
		const featureFolder = path.join('src', 'features', featureName)
		const featureNamePascal = voca.titleCase(featureName).split(' ').join('')

		// Generate BaseFolder
		await fs.mkdir(path.join(featureFolder, 'component'), { recursive: true })
		await fs.mkdir(path.join(featureFolder, 'container'), { recursive: true })
		await fs.mkdir(path.join(featureFolder, 'state'), { recursive: true })
		await fs.mkdir(path.join(featureFolder, 'types'), { recursive: true })
		await fs.mkdir(path.join(featureFolder, 'hook'), { recursive: true })

		// Generate Base Typing
		let typeTemplate = await (await fs.readFile('script/template/stateType.ejs')).toString('utf-8')
		typeTemplate = ejs.render(typeTemplate, { name: featureNamePascal })
		await fs.writeFile(path.join(featureFolder, 'types', featureNamePascal + 'State.type.ts'), typeTemplate)

		// Generate Action
		let actionTemplate = await (await fs.readFile('script/template/action.ejs')).toString('utf-8')
		actionTemplate = ejs.render(actionTemplate, { name: featureNamePascal })
		await fs.writeFile(path.join(featureFolder, 'state', featureNamePascal + '.action.ts'), actionTemplate)

		// Generate Slice
		let sliceTemplate = await (await fs.readFile('script/template/slice.ejs')).toString('utf-8')
		sliceTemplate = ejs.render(sliceTemplate, { name: featureNamePascal })
		await fs.writeFile(path.join(featureFolder, 'state', featureNamePascal + '.slice.ts'), sliceTemplate)

		// Register To store
		let storeData = await fs.readFile('src/features/_shared/store/store.ts')
		let nctx = storeData.toString().split('\n')
		let nLen = nctx.length
		nctx.splice(nLen - 5, 0, '\t\t' + featureNamePascal + ': ' + featureNamePascal + 'Reducer')
		nctx.splice(nctx.findIndex(e => e == ''), 0, "import { " + featureNamePascal + "Reducer } from '../../" + featureName + "/state/" + featureNamePascal + ".slice';")
		let jnctx = nctx.join('\n')
		await fs.writeFile('src/features/_shared/store/store.ts', jnctx)

		vorpal.exec("exit");
	});

// service
vorpal
	.command('service', 'Generate service by name')
	.action(async function (args, callback) {

		let sName = await this.prompt({
			type: 'input',
			name: 'name',
			message: 'Service Name : '
		})
		const serviceName = voca.camelCase(sName.name).split(' ').join('')
		const serviceFolder = path.join('src', 'features', '_shared', 'service')
		const serviceNamePascal = voca.titleCase(serviceName).split(' ').join('')

		// Generate service Typing
		let typeTemplate = await (await fs.readFile('script/template/service.ejs')).toString('utf-8')
		typeTemplate = ejs.render(typeTemplate, { name: serviceNamePascal })
		console.log(typeTemplate)
		await fs.writeFile(path.join(serviceFolder, serviceNamePascal + 'Service.ts'), typeTemplate)
		vorpal.exec("exit");
	});

vorpal
	.delimiter('codegen$')
	.show();