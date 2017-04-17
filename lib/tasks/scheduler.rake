desc "Run request every 10m"
task :api_request => :environment do
  puts "Updating price..."
  RequestWorker.perform_async
  puts "done."
end
