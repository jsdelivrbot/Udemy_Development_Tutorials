class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :updated_at
end
