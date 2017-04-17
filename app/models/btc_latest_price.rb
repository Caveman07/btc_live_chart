class BtcLatestPrice < ApplicationRecord
  # after_commit { BroadcastWorker.perform_async }
end
