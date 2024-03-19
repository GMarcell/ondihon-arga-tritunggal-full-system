<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ListRequest;
use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class CustomersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ListRequest $request)
    {
        return CustomerResource::collection(Customer::query()->where('company_name', 'LIKE', '%' . $request['search'] . '%')->orderBy('id', 'desc')->paginate($request['per_page'], ['*'], 'page', $request['page']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $uploadFolder = 'customer';
        $image = $request->file('image_link');

        $image_uploaded_path = $image->store($uploadFolder, 'public');

        $customer = new Customer();
        $customer->company_name = $request->company_name;
        $customer->description = $request->description;
        $customer->image_link = $image_uploaded_path;

        $status = $customer->save();

        if ($status) {
            return response('', 204);
        } else {
            return response('Create Customer Failed', 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        return new CustomerResource($customer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        //
    }

    public function updateCustomer(UpdateCustomerRequest $request, Customer $customer)
    {
        $data = $request->validated();
        $newCustomer = $customer->find($request->id);
        $image_path = 'storage/' . $customer->image_link;
        if (File::exists(public_path($image_path))) {
            File::delete(public_path($image_path));
        }
        $uploadFolder = 'customer';
        if (isset($data['image_link'])) {
            $image = $request->file('image_link');
            $image_uploaded_path = $image->store($uploadFolder, 'public');
            $status = $newCustomer->update([
                'company_name' => $data['company_name'],
                'description' => $data['description'],
                'image_link' => $image_uploaded_path,
            ]);
        } else {
            $status = $newCustomer->update([
                'company_name' => $data['company_name'],
                'description' => $data['description'],
            ]);
        }

        if ($status) {
            return response('', 204);
        } else {
            return response('Update Failed', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }

    public function deleteCustomer(Request $request, Customer $customer)
    {
        $data = $customer->find($request->id);
        $image_path = 'storage/' . $data->image_link;
        if (File::exists(public_path($image_path))) {
            File::delete(public_path($image_path));
        } 
        // else {
        //     return response('Image File Not Found', 500);
        // }
        $data->delete();
        return response('', 204);
    }
}
