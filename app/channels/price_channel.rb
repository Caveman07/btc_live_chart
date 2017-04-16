class PriceChannel < ApplicationCable::Channel
  def subscribed
      stream_from 'latest_price'
  end
end
