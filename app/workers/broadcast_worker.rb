class BroadcastWorker
  include Sidekiq::Worker
  sidekiq_options :retry => false
  def perform
    ActionCable.server.broadcast 'latest_price', { data: BtcLatestPrice.where('created_at > ? AND created_at < ?', DateTime.now - 3.hours, DateTime.now)}
  end
end
