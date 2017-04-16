class ThreeHourChartController < ApplicationController
  def index
  end

  def get_data
    @data = BtcLatestPrice.where('created_at > ? AND created_at < ?', DateTime.now - 3.hours, DateTime.now)
    respond_to do |format|
          format.json do
            render json: @data.to_json
          end
    end
  end
  
end
