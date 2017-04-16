require 'sidekiq-scheduler'

class RequestWorker
  include Sidekiq::Worker
  require 'faraday'
  require 'json'
  sidekiq_options :retry => false

  def perform
    btc_e = Faraday.new(:url => 'https://btc-e.nz/')

    begin
      usd = btc_e.get('/api/3/ticker/btc_usd')
      eur = btc_e.get('/api/3/ticker/btc_eur')
      rub = btc_e.get('/api/3/ticker/btc_rur')
    rescue
      raise "Can't access BTC-E API"
    end

    usd_btc = JSON.parse(usd.body)
    eur_btc = JSON.parse(eur.body)
    rub_btc = JSON.parse(rub.body)

    BtcLatestPrice.create(btc_usd: usd_btc['btc_usd']['last'], btc_eur: eur_btc['btc_eur']['last'], btc_rur: rub_btc['btc_rur']['last'])

  end
end
