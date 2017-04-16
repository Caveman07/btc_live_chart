class CreateBtcLatestPrices < ActiveRecord::Migration[5.0]
  def change
    create_table :btc_latest_prices do |t|
      t.float :btc_usd
      t.float :btc_eur
      t.float :btc_rur

      t.timestamps
    end
  end
end
