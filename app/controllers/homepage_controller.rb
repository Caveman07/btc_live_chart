

class HomepageController < ApplicationController

  def index
  end

  def show
    RequestWorker.perform_async()
    render html: "<strong>REQUEST to BTC-E LAST TRANSACTION</strong>"
  end
end
