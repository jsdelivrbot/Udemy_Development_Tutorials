class FreeLanceDocumentsController < ApplicationController
  before_action :set_free_lance_document, only: [:show, :update, :destroy]

  # GET /free_lance_documents
  def index
    @free_lance_documents = FreeLanceDocument.all

    render json: @free_lance_documents # only rendering JSON, no views
  end

  # GET /free_lance_documents/1
  def show
    render json: @free_lance_document
  end

  # POST /free_lance_documents
  def create
    @free_lance_document = FreeLanceDocument.new(free_lance_document_params)

    if @free_lance_document.save
      render json: @free_lance_document, status: :created, location: @free_lance_document
    else
      render json: @free_lance_document.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /free_lance_documents/1
  def update
    if @free_lance_document.update(free_lance_document_params)
      render json: @free_lance_document
    else
      render json: @free_lance_document.errors, status: :unprocessable_entity
    end
  end

  # DELETE /free_lance_documents/1
  def destroy
    @free_lance_document.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_free_lance_document
      @free_lance_document = FreeLanceDocument.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def free_lance_document_params
      params.require(:free_lance_document).permit(:title, :description, :file_url, :image_url)
    end
end
