require "spec_helper"

describe Post do
  before do
    @Post = Post.new({:title => 'Posting', :text => 'The first posting'})
  end

  it "hash the correct information in a key" do
    @Post.title.should == 'Posting'
    @Post.text.should == 'The first posting'
  end
end