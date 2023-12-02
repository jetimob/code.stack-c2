<?php
namespace app\Services;

use App\Http\Requests\StorePublisherRequest;
use App\Models\Publisher;

Class PublisherService
{
    public function upsertPublisher(StorePublisherRequest $request, ?Publisher $publisher = null): Publisher{

        return \DB::transaction(function () use ($request, $publisher) {
            if ($publisher === null) {
                return $this->createPublisher($request);
            }

            return $this->updatePublisher($request, $publisher);
        });
    }
    private function createPublisher(StorePublisherRequest $request): Publisher {
        return Publisher::create($request->validated());
    }
    private function updatePublisher(StorePublisherRequest $request, Publisher $publisher): publisher {
        if($request->get('cover_id') === null && $publisher->cover_id != null ){
            $publisher->save();
        }
        $publisher->update($request->validated());
        return $publisher;
    }
    public function deletePublisher(Publisher $publisher): void{
        \DB::transaction(function () use ($publisher){
            $publisher->delete();
        });
    }
}
