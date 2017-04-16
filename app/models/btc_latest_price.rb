class BtcLatestPrice < ApplicationRecord
  # after_create :broadcast_price
  #
  # def broadcast_price
  #   ActionCable.server.broadcast 'latest_price', new_price: self
  # end
end
