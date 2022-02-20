
const {
		ServiceWrapper,
		AmqpManager,
		Middlewares,
		createLogger,
		createMonitor
	} = require("@molfar/service-chassis")

const Scanany = require("@molfar/scanany")
const { extend } = require("lodash") 

module.exports = async () => {

	 let service = new ServiceWrapper({
	 	
	 	publisher: null,
	 	consumer: null,
	 	config: null,
	 	
	 	async onConfigure(config, resolve){
	 		
	 		this.config = config
	 		
	 		await this.configureLogs(config) 
		 	
	 		this.publisher = await AmqpManager.createPublisher(this.config.service.produce)
			this.consumer = await AmqpManager.createConsumer(this.config.service.consume)

	 	// 	const taskCounter = new serviceChassis.promClient.Counter({
			//     name: 'task',
			//     help: 'Scheduler task counter',
			//     labelNames: ['task'],
			// });

		 // 	await this.publisher.use([
			//     Middlewares.Schema.validator(this.config.service.produce.message),
			//     Middlewares.Metric({
			//         metric: taskCounter,
			//         callback: (err, msg, metric) => {
			//           metric.inc({ task: 'initiated' })
			//         }
			//      }),
			//     Middlewares.Error.BreakChain,
			//     Middlewares.Metric({
			//         metric: taskCounter,
			//         callback: (err, msg, metric) => {
			//           metric.inc({ task: 'published' })
			//         }
			//      }),
			//     Middlewares.Json.stringify
			// ])
		 	
		 	this.log("configure scanany-service")
	 		
			resolve({status: "configured"})
		
	 	},

		onStart(data, resolve){
	 		resolve({status: "started"})	
	 	},

	 	async onStop(data, resolve){
			
			this.log("stop scanany-service")
			await this.publisher.close()
			await this.consumer.close()
			
			resolve({status: "stoped"})

		}

	 })
	 
	 extend(service, {
	 	async configureLogs(config) {
	 		this.logger = await createLogger(config._instance_id, config.service.logger)
	        this.monitor = await createMonitor (config._instance_id, config.service.monitoring)
	        extend( this, this.logger )
	        this.monitor.start()
	 	}
	 })
	 
	 service.start()
	 console.log(`scanany-service started at ${new Date()}`)
}