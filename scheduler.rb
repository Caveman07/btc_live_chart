
require File.expand_path('../config/boot',        __FILE__)
require File.expand_path('../config/environment', __FILE__)
require 'clockwork'

module Clockwork
  every(2.minutes, 'Api request: get latest proce') do
    RequestWorker.perform_async
  end
end
